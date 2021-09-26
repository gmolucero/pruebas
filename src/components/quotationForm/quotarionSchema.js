import * as Yup from "yup";
import { validate } from 'utils';

export const stepOnechema = () => {
    return Yup.object().shape({
        periodo: Yup.string().required("El mes es requerido"),
        amount: Yup.string().required("El monto es requerido")
    })
}

export const validateSchema = validate(stepOnechema);