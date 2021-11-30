import * as Yup from "yup";

export const stepThreechema = () => {
    return Yup.object().shape({
        reason: Yup.string().required("El asunto del credito es requerido"),
        requested_amount: Yup.string().required("La cantidad es requerida"),
        number_quotas: Yup.number().typeError('Deben sen valores númericos').required("el numero de cuotas es requerido").integer('valor no válido').moreThan(3,'Número de cuotas debe ser mayor a 3').max(60, 'El número de cuotas no puede ser mayor a 60'),
        credit_start: Yup.string().required("La fecha del primer pago es requerida"),
    })
}
