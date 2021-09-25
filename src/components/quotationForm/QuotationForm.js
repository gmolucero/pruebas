import React from 'react'
import { useFormik } from "formik";
import moment from 'moment'
import {
    CButton,
    CForm,
    CInput,
    CSelect,
    CFormGroup,
    CRow,
    CCol,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { validateSchema } from './quotarionSchema';

const QuotationForm = ({ label, incominName }) => {

    const [disable, setDisable] = React.useState(true);

    const onSubmit = (data) => {
        console.log('a enviar : ', data);
    }

    const formik = useFormik({
        initialValues: {
            periodo: '',
            amount: '',
        },
        validate: validateSchema,
        onSubmit: onSubmit,
    });

    const handleChange = ({ target: { name, value } }) => formik.setFieldValue(name, value);

    const handleCreateMonth = () => {
        const _currentDate = moment();
        const options = [];
        for (let index = 6; index > 0; index--) {
            const monthName = _currentDate.format('MMMM YYYY');
            options.push(<option key={_currentDate.format('MM-YYYY')} value={_currentDate.format('YYYY-MM-DD')}>{monthName} </option>)
            _currentDate.subtract(1, 'month')
        }
        return options
    }

    return (
        <CForm onSubmit={formik.handleSubmit}>
            <CFormGroup className="mb-3 text-left">
                <label className="bold">{label}</label>
                <CRow>
                    <CCol>
                        <CSelect size="lg"
                            onChange={handleChange}
                            value={formik.values.periodo}
                            name="periodo"
                            className="px-1">
                            <option disabled value="">Periodo</option>
                            {
                                handleCreateMonth()
                            }
                        </CSelect>
                    </CCol>
                    <CCol className="px-0">
                        <CInput
                            size="lg"
                            value={formik.values.amount}
                            name="amount"
                            placeholder="2.000.000"
                            onChange={handleChange}
                        />
                    </CCol>
                    <CCol>
                        <CButton disabled={formik.values.periodo.trim() === '' || formik.values.amount.trim() === ''} onClick={() => console.log('cliked')} color="light" size="lg" className="d-inline-flex align-items-center w-100 justify-content-center">
                            <CIcon name="cil-plus" />
                            Agregar
                        </CButton>
                    </CCol>
                </CRow>

            </CFormGroup>
        </CForm>
    )
}

export default QuotationForm
