import * as Yup from "yup";
import { validate } from 'utils';


export const stepOnechema = () => {
    return Yup.object().shape({
        date: Yup.string().required("El mes es requerido"),
        total: Yup.number().typeError('Deben sen valores númericos').required("El monto es requerido").moreThan(99999,'Monto debe ser igual o mayor a 100000')
        // .test('total', 'Monto invalido', (val) => validateTotals(val))
    })
}

export const validateSchema = validate(stepOnechema);