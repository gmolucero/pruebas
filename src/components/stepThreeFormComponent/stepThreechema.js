import * as Yup from "yup";

export const stepThreechema = () => {
    return Yup.object().shape({
        reason: Yup.string().required("El asunto del credito es requerido"),
        requested_amount: Yup.string().required("La cantidad es requerida"),
        number_quotas: Yup.string().required("el numero de cuotas es requerido"),
        credit_start: Yup.string().required("La fecha del primer pago es requerida"),
    })
}
