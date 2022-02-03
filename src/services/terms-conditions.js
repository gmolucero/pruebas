import request from "./index";

export const getLastTerm = async () => {
//   return {
//     data: {
//       result: {
//         id: 1,
//         content:
//           "YOQUERO, a través de su propietaria Credit Link SpA (en adelante ambos “YOQUERO”), es un punto de encuentro entre clientes prospectos de créditos con todas las instituciones financieras del mercado (bancos, cajas de compensación, cooperativas, financieras, entre otras), licitando el proceso crediticio en línea en donde las instituciones financieras competirán por los clientes mediante el envío mutuo de información financiera y comercial relevante al producto financiero en cuestión, y posteriormente, en caso de aceptación de los términos de éste, las comunicaciones entre las partes se llevan privadamente como normalmente ocurre en este tipo de operaciones comúnmente conocidas. YOQUERO permite a usuarios cargar sus antecedentes financieros para solicitar créditos y así recibir pre-ofertas personalizadas según sus propios antecedentes por parte de toda la industria financiera. YOQUERO permite reducir costos de tiempo y recursos tanto para clientes como también para industrias financieras, permitiéndoles tener un canal centralizado de ventas de productos financieros en línea con trazabilidad, repositorio documental por cliente y permitiéndoles acceder a otros clientes prospectos que no sean necesariamente sus clientes.",
//       },
//     },
//   };
  return request({
    method: "GET",
    url: `/terms`,
  });
};
