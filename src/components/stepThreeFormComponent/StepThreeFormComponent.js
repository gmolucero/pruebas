

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

const StepThreeFormComponent = ({ formik, onChange }) => {

    return (
        <CForm className="my-5" onSubmit={formik.handleSubmit}>


            <CFormGroup className="mb-3 text-left">
                <CSelect size="lg" onChange={onChange} name="subject" value={formik.values.subject}>
                    <option disabled value="">Motivo del crédito</option>
                    {
                        [].map((_subject) => (<option key={_subject.id} value={_subject.id}>{_subject.subject}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.subject)}>{formik.errors.subject}</CInvalidFeedback>

            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CInput
                    size="lg"
                    value={formik.values.amount}
                    placeholder="Monto solicitado"
                    invalid={formik.touched.amount && !!formik.errors.amount}
                    onChange={onChange}
                    name="amount"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.amount && !!formik.errors.amount)}>{formik.errors.amount}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CInput
                    size="lg"
                    value={formik.values.fee}
                    placeholder="Número de cuotas"
                    invalid={formik.touched.fee && !!formik.errors.fee}
                    onChange={onChange}
                    name="fee"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.fee && !!formik.errors.fee)}>{formik.errors.fee}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CSelect size="lg" onChange={onChange} name="date_first_pay" value={formik.values.date_first_pay}>
                    <option disabled value="">Fecha pago primero cuota</option>
                    {
                        [].map((_date_first_pay) => (<option key={_date_first_pay.id} value={_date_first_pay.id}>{_date_first_pay.date_first_pay}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.date_first_pay)}>{formik.errors.date_first_pay}</CInvalidFeedback>

            </CFormGroup>


            <CButton type="submit" color="secondary" size="lg" className="btn-login d-inline px-4" >
                Enviar cotizacion
            </CButton>

        </CForm>
    )
}

StepThreeFormComponent.defaultProps = {
    onChange: () => null
}

StepThreeFormComponent.propTypes = {
    formik: PropTypes.shape({
        errors: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        touched: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    }).isRequired,
    onChange: PropTypes.func
}

export default StepThreeFormComponent;
