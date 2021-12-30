import * as Yup from "yup";

export const UserEditAddressProfessionSchema = () => {
    return Yup.object().shape({
        day: Yup.string().required("El día es requerido"),
        month: Yup.string().required("El mes es requerido"),
        year: Yup.string().required("El año es requerido"),
        country: Yup.string().required("La nacionalidad es requerida"),
        region: Yup.string().required("La región es requerida"),
        commune: Yup.string().required("La comuna es requerida"),
        education_level: Yup.string().required("El nivel de estudio es requerido"),
        occupation: Yup.string().required("La ocupación es requerida"),
        other_occupation: Yup.string().when("occupation", {
            is: 'Otro',
            then: Yup.string().required("Su ocupación es requerida")
        })
    })
}