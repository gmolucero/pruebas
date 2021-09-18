import React, { useState, useEffect } from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CFormGroup,
    CLabel,
    CInput,
    CCol,
    CInvalidFeedback,
} from "@coreui/react";

function PrincipalForm(props) {

    const [principal, setPrincipal] = useState(props.data);

    useEffect(() => {
        setPrincipal(props.data);
    }, [props.data]); // CADA VEZ QUE CAMBIA EL STATE PADRE, DEBE CAMBIAR 
    // EL STATE DEL COMPONENTE ACTUAL

    function handleChange(event) {
        props.onFormikChange(event);
        const { name, value } = event.target;
        setPrincipal({
            ...principal,
            [name]: value
        });
    }

    return (
        <CCard className="bold">
            <CCardHeader className="h-card">
                Formulario de ejemplo
                    </CCardHeader>

            <CCardBody>
                <CFormGroup row>
                    <CLabel md="3" col htmlFor="rut">
                        RUT
                    </CLabel>
                    <CCol xs="9" md="6">
                        <CInput
                            id="rut"
                            name="rut"
                            className="c-shadow"
                            onBlur={props.onFormikBlur}
                            onChange={handleChange}
                            invalid={props.touched.rut && !!props.errors.rut}
                            value={principal.rut} />
                        <CInvalidFeedback>{props.errors.rut}</CInvalidFeedback>
                    </CCol>
                    <CCol xs="2" md="3">
                        <CInput
                            id="dv"
                            name="dv"
                            className="c-shadow"
                            onBlur={props.onFormikBlur}
                            onChange={handleChange}
                            invalid={props.touched.dv && !!props.errors.dv}
                            value={principal.dv} />
                        <CInvalidFeedback>{props.errors.dv}</CInvalidFeedback>
                    </CCol>
                </CFormGroup>
            </CCardBody>
        </CCard>
    );
}

export default PrincipalForm;
