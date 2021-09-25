

import React from "react";
import PropTypes from 'prop-types';
import {
    CButton,
    CForm,
    CInput,
    CInvalidFeedback,
    CFormGroup
} from "@coreui/react";

import { getValidationResult } from 'utils';

const LoginFormComponent = ({ formik, onChange }) => {

    return (
        <CForm className="my-5 mt-md-0" onSubmit={formik.handleSubmit}>
            <CFormGroup className="mb-3">
                <CInput
                    type="email"
                    placeholder="Correo electronico"
                    autoComplete="email"
                    value={formik.values.email}
                    invalid={formik.touched.email && !!formik.errors.email}
                    onChange={onChange}
                    name="email"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.email && !!formik.errors.email)}>{formik.errors.email}</CInvalidFeedback>
            </CFormGroup>
            <CFormGroup className="mb-3">
                <CInput
                    type="password"
                    placeholder="*******"
                    onChange={onChange}
                    value={formik.values.password}
                    autoComplete="Password"
                    invalid={formik.touched.password && !!formik.errors.password}
                    name="password"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.password && !!formik.errors.password)}>{formik.errors.password}</CInvalidFeedback>
            </CFormGroup>

            <a href="#/recuperar" className="mb-4 text-white d-block">¿Olvidaste tu contraseña?</a>

            <CButton type="submit" className="btn-login d-inline px-4" >
                Iniciar sesión
            </CButton>

        </CForm>
    )
}

LoginFormComponent.defaultProps = {
    onChange: () => null
}

LoginFormComponent.propTypes = {
    formik: PropTypes.shape({
        errors: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        touched: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    }).isRequired,
    onChange: PropTypes.func
}

export default LoginFormComponent;
