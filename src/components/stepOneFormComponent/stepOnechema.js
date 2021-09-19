import * as Yup from "yup";

export const stepOnechema = () => {
    return Yup.object().shape({
        birthdate: Yup.string().required("La fecha de nacimiento es requerida"),
        region: Yup.string().required("La región es requerida"),
        commune: Yup.string().required("La comuna es requerida"),
        knowledge: Yup.string().required("El nivel de estudio es requerido"),
        ocupation: Yup.string().required("La ocupación es requerida"),
    })
}