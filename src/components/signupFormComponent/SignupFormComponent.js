

import React from "react";
import { formatRut } from '@fdograph/rut-utilities';
import PropTypes from 'prop-types';
import {
    CButton,
    CForm,
    CInput,
    CInvalidFeedback,
    CFormGroup
} from "@coreui/react";

import { getValidationResult } from 'utils';

const SignupFormComponent = ({ formik, onChange }) => {

    return (
        <CForm className="my-5" onSubmit={formik.handleSubmit}>
            <CFormGroup className="mb-3">
                <CInput
                    type="text"
                    placeholder="Nombre"
                    value={formik.values.name}
                    invalid={formik.touched.name && !!formik.errors.name}
                    onChange={onChange}
                    name="name"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.name && !!formik.errors.name)}>{formik.errors.name}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <CInput
                    type="text"
                    placeholder="Apellido"
                    value={formik.values.lastname}
                    invalid={formik.touched.lastname && !!formik.errors.lastname}
                    onChange={onChange}
                    name="lastname"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.lastname && !!formik.errors.lastname)}>{formik.errors.lastname}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <CInput
                    type="text"
                    placeholder="Rut"
                    value={formatRut(formik.values.rut.replace('-', ''))}
                    invalid={formik.touched.rut && !!formik.errors.rut}
                    onChange={onChange}
                    name="rut"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.rut && !!formik.errors.rut)}>{formik.errors.rut}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <CInput
                    type="email"
                    placeholder="Correo electronico"
                    value={formik.values.email}
                    invalid={formik.touched.email && !!formik.errors.email}
                    onChange={onChange}
                    name="email"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.email && !!formik.errors.email)}>{formik.errors.email}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <CInput
                    placeholder="teléfono"
                    value={formik.values.phone}
                    invalid={formik.touched.phone && !!formik.errors.phone}
                    onChange={onChange}
                    name="phone"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.phone && !!formik.errors.phone)}>{formik.errors.phone}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <CInput
                    type="password"
                    placeholder="contraseña"
                    onChange={onChange}
                    value={formik.values.password}
                    invalid={formik.touched.password && !!formik.errors.password}
                    name="password"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.password && !!formik.errors.password)}>{formik.errors.password}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <CInput
                    type="password"
                    placeholder="confirme contraseña"
                    onChange={onChange}
                    value={formik.values.password_confirmation}
                    invalid={formik.touched.password_confirmation && !!formik.errors.password_confirmation}
                    name="password_confirmation"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.password_confirmation && !!formik.errors.password_confirmation)}>{formik.errors.password_confirmation}</CInvalidFeedback>
            </CFormGroup>

            <CInvalidFeedback className="d-inline" invalid={getValidationResult(formik.touched.term && !!formik.errors.term)}>{formik.errors.term}</CInvalidFeedback>
            <p className="mb-4 text-white d-block">
                <CInput id="terms" type="checkbox" name="term" checked={formik.values.term} className="w-auto d-inline h-auto" onChange={onChange} /> Al utilizar la plataforma aceptas nuestros <a href="/" className="text-white underline" >Términos y Condiciones de Privacidad</a>
            </p>

            <CButton type="submit" className="btn-login d-inline px-4" >
                Comenzar
            </CButton>

        </CForm>
    )
}

SignupFormComponent.defaultProps = {
    onChange: () => null
}

SignupFormComponent.propTypes = {
    formik: PropTypes.shape({
        errors: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        touched: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    }).isRequired,
    onChange: PropTypes.func
}

export default SignupFormComponent;
