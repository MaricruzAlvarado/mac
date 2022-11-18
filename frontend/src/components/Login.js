import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { Box, TextField,Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AuthApi from "../AuthApi";
import Cookies from "js-cookie";
import { LOGIN } from "../GraphQL/Querys";
import Button from '@mui/material/Button'

/*
 *
 *  Styles
 *
 */

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  tittle: {
    flexGrow: 1
  },
  defaultBox: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    marginTop: 5,
    padding: 3,
    borderRadius: 5,
    boxShadow: "5px 5px 10px #ccc",
    sx: {
      ":hover": {
        boxShadow: "10px 10px 20px #ccc"
    }}
  }
}));

/*
 *
 *  Declaraciones
 *
 */
export default function Login()  {

const classes = useStyles();
const Auth = React.useContext(AuthApi);
const [body, setBody] = useState({ name: "", password: "" });
  
  const readCookie = () => {
    const admin = Cookies.get("admin");
    if (admin) {
      Auth.setAuth(true);
    }
  };
    React.useEffect(() => {
    readCookie();
  }, []); 

  const handleChange = (e) => {
    console.log(e.target.value);
    setBody({
      ...body,
      [e.target.name]: e.target.value
    })
  };


  const [getLazyLogin, result ]= useLazyQuery(
    LOGIN , {fetchPolicy: 'network-only'});

  const [adminInfo, setAdminInfo] =useState(null);

  const validateLogin = (name, password) =>{ 
    getLazyLogin({
      variables: { name, password}})
  }
  useEffect(()=>{
    if(result.data){
      setAdminInfo(result.data.login)
    }
  }, [result])

  if (adminInfo){
    Auth.setAuth(true);
    Cookies.set("admin" , adminInfo.name);
    alert('Bienvenido(a) ' + adminInfo.name)
  }

  return (
    <Box component="main" marginTop={15} sx={{ flexGrow: 1, p: 3  }}>
      <form>
          <Box className={classes.defaultBox} sx={{backgroundColor: "#ffd9b3"}} >
            <Typography variant="h4" padding={3} textalign="center">
              Welcome!
            </Typography>
            <TextField
              sx={{backgroundColor: "#ffffff"}}
              name="name"
              margin="normal"
              type={"text"}
              variant="outlined"
              placeholder="Username"
              value={body.name}
              onChange={handleChange}
            ></TextField>
            <TextField
              sx={{backgroundColor: "#ffffff"}}
              name="password"
              type={"password"}
              variant="outlined"
              placeholder="Password"
              value={body.password}
              onChange={handleChange}
            ></TextField>
              <Button
                sx={{ margin: 2, borderRadius: 3 }}
                variant="contained"
                color="warning" onClick={() =>validateLogin(body.name, body.password)}
              >
                Login
              </Button>
          </Box>
        
        </form>
        
    </Box>
 );
}

//export default Login