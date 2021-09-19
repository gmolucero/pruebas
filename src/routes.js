import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Home = React.lazy(() => import("./views/home/Home"));
const PreOrders = React.lazy(() => import("./views/preOrders/PreOrders"));
const OrderDetails = React.lazy(() => import("./views/orderDetails/OrderDetails"));
const Summary = React.lazy(() => import("./views/summary/Summary"));
const Quotation = React.lazy(() => import("./views/quotation/Quotation"));


const CardComponent = React.lazy(() => import("./components/cardComponent/CardComponent"));
// INICIO SECCION DE EJEMPLOS
const NewExample = React.lazy(() => import("./views/example/New"));
const NewExampleSinFormik = React.lazy(() => import("./views/example/NewSinFormik"));
// FIN SECCION DE EJEMPLOS

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/card", name: "Dashboard", component: CardComponent },
  { path: "/resumen", name: "Summary", component: Summary },
  { path: "/orders/:hash", name: "Orders", component: OrderDetails },
  { path: "/orders", name: "Orders", component: PreOrders },
  { path: "/cotizacion", name: "Quotation", component: Quotation },
  // INICIO SECCION DE EJEMPLOS
  // { path: "/ejemplos/nuevo", name: "NewExample", component: NewExample },
  // { path: "/ejemplos/nuevoSinFormik", name: "NewExampleSinFormik", component: NewExampleSinFormik }
  // FIN SECCION DE EJEMPLOS
];

export default routes;
