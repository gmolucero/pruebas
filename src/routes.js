import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Home = React.lazy(() => import("./views/home/Home"));
const PreOffer = React.lazy(() => import("./views/preOffer/PreOffer"));
const OrderDetails = React.lazy(() => import("./views/orderDetails/OrderDetails"));
const Summary = React.lazy(() => import("./views/summary/Summary"));
const Quotation = React.lazy(() => import("./views/quotation/Quotation"));
const EditSingUp = React.lazy(() => import("./views/singup/EditSingUp"));
const EditAddressProfession = React.lazy(() => import("./views/user/EditAddressProfession"));
const EditRent = React.lazy(() => import("./views/user/EditRent"));

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/resumen", name: "Summary", component: Summary },
  { path: "/detalle/:offer_id", name: "Orders", component: OrderDetails },
  { path: "/oferta/:offer_id", name: "Orders", component: PreOffer },
  { path: "/cotizacion", name: "Quotation", component: Quotation },
  { path: "/actualizar-datos", name: "EditSingUp", component: EditSingUp },
  { path: "/actualizar-profesion", name: "EditAddressProfession", component: EditAddressProfession },
  { path: "/actualizar-renta", name: "EditRent", component: EditRent }
];

export default routes;
