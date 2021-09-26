import * as Yup from "yup";

export const stepOnechema = () => {
    return Yup.object().shape({
        day: Yup.string().required("El día de nacimiento es requerido"),
        month: Yup.string().required("El mes de nacimiento es requerido"),
        year: Yup.string().required("El año de nacimiento es requerido"),
        region: Yup.string().required("La región es requerida"),
        commune: Yup.string().required("La comuna es requerida"),
        education_level: Yup.string().required("El nivel de estudio es requerido"),
        occupation: Yup.string().required("La ocupación es requerida"),
    })
}