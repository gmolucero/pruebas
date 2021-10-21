import * as Yup from "yup";
import { validateRut } from '@fdograph/rut-utilities';

export const signupSchema = () => {
    return Yup.object().shape({
        name: Yup.string().required("El nombre es requerido").min(3, "El nombre debe tener mínimo 3 caracteres").matches(/^[aA-zZ\s]+$/, "Nombre no válido "),
        rut: Yup.string()
            .test('rut', 'El rut es invalido', (val) => validateRut(val.replace('-', '')))
            .required("El rut es requerido"),
        email: Yup.string()
            .email('Email inválido')
            .max(100, 'El texto no debe superar los 50 carácteres')
            .required("La dirección de correo es requerida"),
        phone: Yup.string()
            .test('phone', 'Número invalido', (val) => !isNaN(val))
            .min(8, 'El número debe contener al 8 dígitos como mínimo')
            .max(10, 'El número debe contener al 10 dígitos como máximo')
            .required("El teléfono es requerido"),
        password: Yup.string()
            .min(8, "La contraseña debe terner mínimo 8 caracteres")
            .required("La contraseña es requerida"),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "La contraseña no coinciden"),
        term: Yup.boolean().oneOf([true], 'Debe aceptar los terminos y condiciones'),
    })
}