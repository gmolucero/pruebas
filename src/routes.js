import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Home = React.lazy(() => import("./views/home/Home"));
// INICIO SECCION DE EJEMPLOS
const NewExample = React.lazy(() => import("./views/example/New"));
const NewExampleSinFormik = React.lazy(() => import("./views/example/NewSinFormik"));
// FIN SECCION DE EJEMPLOS

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  // INICIO SECCION DE EJEMPLOS
  // { path: "/ejemplos/nuevo", name: "NewExample", component: NewExample },
  // { path: "/ejemplos/nuevoSinFormik", name: "NewExampleSinFormik", component: NewExampleSinFormik }
  // FIN SECCION DE EJEMPLOS
];

export default routes;
