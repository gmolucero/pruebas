import React, { useEffect, useState, useMemo, useReducer } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./app/ProtectedRoute";
import { context, initialState } from "./context/context";
import { reducer } from "context/reducers";
import "./scss/style.scss";


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
// Pages
const Login = React.lazy(() => import("./views/login/Login"));
const Singup = React.lazy(() => import("./views/singup/Singup"));
const RecoverPassword = React.lazy(() => import("./views/recoverPassword/RecoverPassword"));
const ChangePassword = React.lazy(() => import("./views/changePassword/ChangePassword"));

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const providerValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  // const [usuario, setUsuario] = useState(null);
  // const [token, setToken] = useState(true);
  // const [cargandoUsuario, setCargandoUsuario] = useState(true);

  // useEffect(() => {
  //   async function cargarUsuario() {
  //     const token = window.localStorage.getItem("token")
  //     if (token) {
  //       setValue(window.localStorage.getItem("user"));
  //       return;
  //     }
  //   }
  //   cargarUsuario();
  // }, []);

  return (
    <context.Provider value={providerValue}>
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/registro" name="Signup Page" component={Singup} />
            <Route exact path="/recuperar" name="Recover password Page" component={RecoverPassword} />
            <Route exact path="/actualizar/:tokenId" name="Recover password Page" component={ChangePassword} />
            <ProtectedRoute
              path="/"
              name="Home"
              component={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    </context.Provider>
  );
}
