import * as Yup from "yup";
import { validate } from 'utils';

export const stepOnechema = () => {
    return Yup.object().shape({
        date: Yup.string().required("El mes es requerido"),
        total: Yup.string().required("El monto es requerido")
    })
}

export const validateSchema = validate(stepOnechema);