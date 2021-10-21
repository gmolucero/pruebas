import * as Yup from "yup";

export const stepThreechema = () => {
    return Yup.object().shape({
        reason: Yup.string().required("El asunto del credito es requerido"),
        requested_amount: Yup.number().typeError('Deben sen valores númericos').required("La cantidad es requerida").integer('valor no válido'),
        number_quotas: Yup.number().typeError('Deben sen valores númericos').required("el numero de cuotas es requerido").integer('valor no válido').moreThan(3,'Número de cuotas debe ser mayor a 3'),
        credit_start: Yup.string().required("La fecha del primer pago es requerida"),
    })
}
