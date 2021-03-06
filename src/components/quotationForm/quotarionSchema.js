import * as Yup from "yup";
import { validate } from 'utils';


export const stepOnechema = () => {
    let regex = /^(\d{1,3})+((\.\d{3})*)$/;
    return Yup.object().shape({
        date: Yup.string().required("El mes es requerido"),
        total: Yup.string().required("El monto es requerido")
            .test('totalValid', 'Deben sen valores númericos', value => regex.test(value) )
            .test('totalMin', 'Monto debe ser igual o mayor a 100.000', value => parseInt( value.replace(/[^0-9 ]/g, '') ) > 99999 )
        // total: Yup.number().typeError('Deben sen valores númericos').required("El monto es requerido").moreThan(99999,'Monto debe ser igual o mayor a 100000')
        // .test('total', 'Monto invalido', (val) => validateTotals(val))
    })
}

export const validateSchema = validate(stepOnechema);