import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./themeConfig";
import Box from "@mui/material/Box";
import NavBar from "./components/NavBar";
import AuthApi from "./AuthApi";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import EmployeesList from "./components/EmployeesList";
import NotFound from "./components/NotFound";
  

function App() {
  const [auth, setAuth] = React.useState(false);
  return (
    <>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Box sx={{ display: "flex" }} >
          <MuiThemeProvider theme={theme} >
            <NavBar />
            <Switch>
              <Routes />
            </Switch>
          </MuiThemeProvider>
        </Box>
      </AuthApi.Provider>
    </>
  );
}

/*
 *
 *  Rutas
 *
 */

const Routes = () => {
  const Auth = React.useContext(AuthApi);
  return (
    <Switch>
      <ProtectedLogin exact path="/login" auth={Auth.auth} component={Login} />
      <ProtectedEmployees exact path="/employeesList" auth={Auth.auth} component={EmployeesList}/>
      <ProtectedWelcome exact path="/" auth={Auth.auth} component={Welcome} />
      <Route exact path="*"  component={NotFound} />
    </Switch>
  );
};

const ProtectedEmployees = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (!auth ? <Component /> : <Redirect to="/" />)}
    />
  );
};
const ProtectedWelcome = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

export default App;
