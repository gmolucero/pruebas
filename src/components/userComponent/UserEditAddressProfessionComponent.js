import React from "react";
import {
    CNav,
    CNavItem,
    CNavLink
} from "@coreui/react";
import StepOneFormComponent from '../stepOneFormComponent/StepOneFormComponent';
const UserEditAddressProfessionComponent = () => {
    const [errorAge, setErrorAge] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            day: '',
            month: '',
            year: '',
            country: '',
            region: '',
            commune: '',
            education_level: '',
            occupation: '',
            other_occupation: ''
        },
        validate: validate(schema),
        onSubmit: next,
    });
    return (<>
        <StepOneFormComponent formik={formik} onChange={handleTextChange} errorAge={errorAge} />
    </>);
};

export default UserEditAddressProfessionComponent;