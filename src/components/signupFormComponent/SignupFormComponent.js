

import React from "react";
import PropTypes from 'prop-types';
import {
    CButton,
    CForm,
    CInput,
    CInvalidFeedback,
    CFormGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInputGroup
} from "@coreui/react";
import logo from '../../assets/img/pdf.pdf'
import { getValidationResult } from 'utils';

const SignupFormComponent = ({ formik, onChange, changeRut, edit }) => {
    return (
        <CForm className="mt-3" onSubmit={formik.handleSubmit}>
            <CFormGroup className="mb-3">
                <CInput
                    type="text"
                    placeholder="Nombre completo"
                    value={formik.values.name}
                    invalid={formik.touched.name && !!formik.errors.name}
                    onChange={onChange}
                    autoComplete="off"
                    name="name"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.name && !!formik.errors.name)}>{formik.errors.name}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <CInput
                    type="text"
                    placeholder="Rut"
                    value={formik.values.rut}
                    //value={formatRut(formik.values.rut.replace('-', ''))}
                    onChange={onChange}
                    invalid={formik.touched.rut && !!formik.errors.rut}
                    onBlur={changeRut}
                    autoComplete="off"
                    name="rut"
                    disabled={edit ? true : false}
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
                    autoComplete="off"
                    name="email"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.email && !!formik.errors.email)}>{formik.errors.email}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <CInputGroup>
                    <CInputGroupPrepend>
                        <CInputGroupText>
                            +569
                        </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                        placeholder="N° teléfono celular"
                        value={formik.values.phone}
                        invalid={formik.touched.phone && !!formik.errors.phone}
                        onChange={onChange}
                        autoComplete="off"
                        name="phone"
                    />
                    <CInvalidFeedback invalid={getValidationResult(formik.touched.phone && !!formik.errors.phone)}>{formik.errors.phone}</CInvalidFeedback>
                </CInputGroup>

            </CFormGroup>

            <CFormGroup className="mb-3">
                <CInput
                    type="password"
                    placeholder="Contraseña"
                    onChange={onChange}
                    value={formik.values.password}
                    invalid={formik.touched.password && !!formik.errors.password}
                    autoComplete="off"
                    name="password"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.password && !!formik.errors.password)}>{formik.errors.password}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3">
                <CInput
                    type="password"
                    placeholder="Confirme contraseña"
                    onChange={onChange}
                    value={formik.values.password_confirmation}
                    invalid={formik.touched.password_confirmation && !!formik.errors.password_confirmation}
                    autoComplete="off"
                    name="password_confirmation"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.password_confirmation && !!formik.errors.password_confirmation)}>{formik.errors.password_confirmation}</CInvalidFeedback>
            </CFormGroup>

            <CInvalidFeedback className="d-inline" invalid={getValidationResult(formik.touched.term && !!formik.errors.term)}>{formik.errors.term}</CInvalidFeedback>
            {!edit ? (
                <p className="mb-4 text-white d-block">
                    <CInput id="terms" type="checkbox" name="term" checked={formik.values.term} className="w-auto d-inline h-auto" onChange={onChange} /> Al utilizar la plataforma aceptas nuestros <a href={logo} target="_blank" className="text-white underline" >Términos y Condiciones de Privacidad</a>
                </p>
            ) : ""}


            <CButton type="submit" className="btn-login d-inline px-4" >
                {edit ? 'Actualizar' : 'Comenzar'}
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
