import React, { useEffect, useState, useMemo } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./app/ProtectedRoute";
import { context } from "./context/context";
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

export default function App() {
  const [value, setValue] = useState(null);
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);
  // const [usuario, setUsuario] = useState(null);
  // const [token, setToken] = useState(true);
  // const [cargandoUsuario, setCargandoUsuario] = useState(true);

  useEffect(() => {
    async function cargarUsuario() {
      const token= window.localStorage.getItem("token")
      if (token) {
        
        setValue(window.localStorage.getItem("user"));     
        return;
      }
    }
    cargarUsuario();
  },[]);

  return (
    <context.Provider value={providerValue}>
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
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
