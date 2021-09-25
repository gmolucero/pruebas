import * as Yup from "yup";

export const loginSchema = () => {
    return Yup.object().shape({
        email: Yup.string()
            .email('Email inválido')
            .max(100, 'El texto no debe superar los 50 carácteres')
            .required("La dirección de correo es requerida"),
        password: Yup.string()
            .min(8, "La contraseña debe terner mínimo 8 caracteres")
            .required("La contraseña es requerida")
    })
}