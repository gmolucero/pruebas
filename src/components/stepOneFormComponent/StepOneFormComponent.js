

import React from "react";
import PropTypes from 'prop-types';
import {
    CButton,
    CForm,
    CInput,
    CSelect,
    CInvalidFeedback,
    CFormGroup
} from "@coreui/react";

import { getValidationResult } from 'utils';

const StepOneFormComponent = ({ formik, onChange }) => {

    return (
        <CForm className="my-5" onSubmit={formik.handleSubmit}>
            <CFormGroup className="mb-3 text-left">
                <label>¿cuándo naciste?</label>
                <CInput
                    type="date"
                    size="lg"
                    value={formik.values.birthdate}
                    invalid={formik.touched.birthdate && !!formik.errors.birthdate}
                    onChange={onChange}
                    name="birthdate"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.birthdate && !!formik.errors.birthdate)}>{formik.errors.birthdate}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CSelect size="lg" onChange={onChange} name="region" value={formik.values.region}>
                    <option disabled value="">Seleccione region...</option>
                    {
                        [].map((_region) => (<option key={_region.id} value={_region.id}>{_region.region}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.region)}>{formik.errors.region}</CInvalidFeedback>

            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CSelect size="lg" onChange={onChange} name="commune" value={formik.values.commune}>
                    <option disabled value="">Seleccione Comuna...</option>
                    {
                        [].map((_commune) => (<option key={_commune.id} value={_commune.id}>{_commune.commune}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.commune)}>{formik.errors.commune}</CInvalidFeedback>

            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CSelect size="lg" onChange={onChange} name="knowledge" value={formik.values.knowledge}>
                    <option disabled value="">Seleccione Comuna...</option>
                    {
                        [].map((_knowledge) => (<option key={_knowledge.id} value={_knowledge.id}>{_knowledge.knowledge}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.knowledge)}>{formik.errors.knowledge}</CInvalidFeedback>

            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CSelect size="lg" onChange={onChange} name="ocupation" value={formik.values.ocupation}>
                    <option disabled value="">Seleccione Comuna...</option>
                    {
                        [].map((_ocupation) => (<option key={_ocupation.id} value={_ocupation.id}>{_ocupation.ocupation}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(formik.touched.ocupation && !!formik.errors.ocupation)}>{formik.errors.ocupation}</CInvalidFeedback>

            </CFormGroup>

            <CButton type="submit" color="secondary" size="lg" className="btn-login d-inline px-4" >
                continuar
            </CButton>

        </CForm>
    )
}

StepOneFormComponent.defaultProps = {
    onChange: () => null
}

StepOneFormComponent.propTypes = {
    formik: PropTypes.shape({
        errors: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        touched: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    }).isRequired,
    onChange: PropTypes.func
}

export default StepOneFormComponent;
