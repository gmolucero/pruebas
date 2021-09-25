

import React from "react";
import PropTypes from 'prop-types';
import {
    CButton,
    CForm,
    CInput,
    CSelect,
    CInvalidFeedback,
    CFormGroup,
    CRow,
    CCol,
    CLink,
} from "@coreui/react";

import { getValidationResult } from 'utils';
import { getRegion, getComuneById } from 'services/location';
import CIcon from "@coreui/icons-react";

import QuotationForm from 'components/quotationForm/QuotationForm';
import AttachFileComponent from 'components/attachFileComponent/AttachFileComponent';

const StepTwoFormComponent = ({ rent, onChange }) => {
    return (
        <div className="my-5">

            <CFormGroup className="mb-3 text-left">
                <label>¿Eres dependiente o independiente?</label>
                <CSelect size="lg" onChange={() => null} name="region">
                    <option>Ambos</option>
                </CSelect>
            </CFormGroup>

            <p> Cuéntanos de tus ingresos líquidos en los últimos 3 meses </p>
            <QuotationForm label="Independiente" />

            {
                rent.independent_income.map((el) => <AttachFileComponent key={el.id} income={el} amountField="independent_income" />)
            }

            <hr />

            <QuotationForm label="Dependiente" />

            {
                rent.dependent_income.map((el) => <AttachFileComponent key={el.id} income={el} amountField="dependent_income" />)
            }


            <CButton type="submit" color="secondary" size="lg" className="btn-login d-inline px-4" >
                continuar
            </CButton>

        </div>
    )
}

StepTwoFormComponent.defaultProps = {
    onChange: () => null,
    rent: {
        independent_income: [],
        dependent_income: [],
    }
}

StepTwoFormComponent.propTypes = {
    // formik: PropTypes.shape({
    //     errors: PropTypes.object.isRequired,
    //     values: PropTypes.object.isRequired,
    //     touched: PropTypes.object.isRequired,
    //     handleSubmit: PropTypes.func.isRequired,
    // }).isRequired,
    // onChange: PropTypes.func
}

export default StepTwoFormComponent;
