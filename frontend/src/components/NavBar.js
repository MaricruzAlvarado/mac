import * as React from "react";

import { AppBar, Toolbar, IconButton, Typography , Button, ListItemText, ListItemButton, ListItem, CssBaseline
,Box,List, Drawer} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import {CatchingPokemon, VerifiedUser} from "@mui/icons-material/";
import { NavLink } from "react-router-dom";

import AuthApi from "../AuthApi";
import Cookies from "js-cookie";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  tittle: {
    flexGrow: 1
  },
  root: {
    color: theme.palette.primary.main
  }
}));

export const NavBar = () => {

  const Auth = React.useContext(AuthApi);

  const LogOut = () => {
    Auth.setAuth(false);
    Cookies.remove("admin");
  };


  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography className={classes.tittle}>
            <NavLink
              color="inherit"
              style={{ textDecoration: "none", color: "white" }}
              margin={5}
              exact
              to="/"
            >
              <IconButton
                size="large"
                adge="start"
                color="inherit"
                aria-label="logo"
              >
                <CatchingPokemon />
                <Typography variant="h6">Home</Typography>
              </IconButton>
            </NavLink>
          </Typography>
          {Auth.auth ?(
          <>
            <Typography sx={{color: 'white'}}  marginRight ={5}> { Cookies.get("admin") } <VerifiedUser/> </Typography>
            <NavLink
            color="inherit"
            style={{ textDecoration: "none"}}
            exact
            to="/login"> <Button sx={{color: 'white' }} onClick={()=>{LogOut()}}> Logout </Button>
            </NavLink>
          </>
          ):(
            <NavLink
            color="inherit"
            style={{ textDecoration: "none", color: "white" }}
            exact
            to="/login"> 
            <Button sx={{color: 'white' }}> Login </Button> 
           </NavLink>
          )
          }
          
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
      <Drawer 
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#ffd9b3" 
          },
        }}
      >
        <Toolbar />
      <Box sx={{ overflow: "auto"}} >
      {Auth.auth ?
        <>
          <List sx={{ backgroundColor: "orange" }} >
            {["Employees"].map((text, index) => (
              <ListItem key={text} disablePadding >
                <ListItemButton>
                  <NavLink
                    color="inherit"
                    style={{ textDecoration: "none", color: "black" }}
                    margin={1}
                    exact
                    to="/employeesList"
                  >
                    <ListItemText primary={text} />
                  </NavLink>
                </ListItemButton>
              </ListItem>
            ))}
          </List> 
          </>
          : null }
        </Box>
      </Drawer>
    </div>
  );
};

export default NavBar;
