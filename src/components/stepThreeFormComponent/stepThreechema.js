import * as Yup from "yup";

export const stepThreechema = () => {
    return Yup.object().shape({
        subject: Yup.string().required("El asunto del credito es requerido"),
        amount: Yup.string().required("La cantidad es requerida"),
        fee: Yup.string().required("el numero de cuotas es requerido"),
        date_first_pay: Yup.string().required("La fecha del primer pago es requerida"),
    })
}