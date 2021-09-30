

import React from "react";
import PropTypes from 'prop-types';
import {
    CButton,
    CForm,
    CInput,
    CSelect,
    CInvalidFeedback,
    CFormGroup,
    CCol,
    CRow
} from "@coreui/react";

import { getValidationResult } from 'utils';
import { getCreditReason } from 'services/lists';
import Spinner from 'app/common/Spinner';

const StepThreeFormComponent = ({ formik, onChange, prev }) => {
    const [reason, setReason] = React.useState([]);

    const handleGetter = async () => {
        try {
            const response = await getCreditReason();
            setReason(response.data.result)
            console.log(response);
        } catch (error) {
            console.error('handleGetter Error: ', error);
        }
    }

    React.useEffect(() => {
        handleGetter();
    }, [])

    return (
        <CForm onSubmit={formik.handleSubmit}>
            <CFormGroup className="mb-3 text-left">
                {

                    reason.length === 0 ? <Spinner /> : <CSelect size="lg" onChange={onChange} name="reason" value={formik.values.reason}>
                        <option disabled value="">Motivo del crédito</option>
                        {
                            reason.map((_reason) => (<option key={_reason.id} value={_reason.nombre}>{_reason.nombre}</option>))
                        }
                    </CSelect>
                }
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.reason)}>{formik.errors.reason}</CInvalidFeedback>

            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CInput
                    size="lg"
                    value={formik.values.requested_amount}
                    placeholder="Monto solicitado"
                    invalid={formik.touched.requested_amount && !!formik.errors.requested_amount}
                    onChange={onChange}
                    name="requested_amount"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.requested_amount && !!formik.errors.requested_amount)}>{formik.errors.requested_amount}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CInput
                    size="lg"
                    value={formik.values.number_quotas}
                    placeholder="Número de cuotas"
                    invalid={formik.touched.number_quotas && !!formik.errors.number_quotas}
                    onChange={onChange}
                    name="number_quotas"
                />
                <CInvalidFeedback invalid={getValidationResult(formik.touched.number_quotas && !!formik.errors.number_quotas)}>{formik.errors.number_quotas}</CInvalidFeedback>
            </CFormGroup>

            <CFormGroup className="mb-3 text-left">
                <CSelect size="lg" onChange={onChange} name="credit_start" value={formik.values.credit_start}>
                    <option disabled value="">Fecha pago primero cuota</option>
                    {
                        [].map((_credit_start) => (<option key={_credit_start.id} value={_credit_start.id}>{_credit_start.credit_start}</option>))
                    }
                </CSelect>
                <CInvalidFeedback className="d-inline" invalid={getValidationResult(!!formik.errors.credit_start)}>{formik.errors.credit_start}</CInvalidFeedback>

            </CFormGroup>

            <CRow className="justify-content-center">
                <CCol xs="12" sm="6" xl="5" className="pt-3">
                    <CButton onClick={prev} color="secondary" size="lg" variant="outline" className="px-4 w-100" >
                        Volver
                    </CButton>
                </CCol>
                <CCol xs="12" sm="6" xl="5" className="pt-3">
                    <CButton type="submit" color="secondary" size="lg" className="btn-login px-4 w-100" >
                        Enviar cotizacion
                    </CButton>
                </CCol>
            </CRow>



        </CForm>
    )
}

StepThreeFormComponent.defaultProps = {
    onChange: () => null,
    prev: () => null
}

StepThreeFormComponent.propTypes = {
    formik: PropTypes.shape({
        errors: PropTypes.object.isRequired,
        values: PropTypes.object.isRequired,
        touched: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    }).isRequired,
    onChange: PropTypes.func,
    prev: PropTypes.func
}

export default StepThreeFormComponent;
