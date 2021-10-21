import React from 'react'
import PropTypes from 'prop-types';
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
    CInvalidFeedback
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { validateSchema } from './quotarionSchema';
import { createRent } from 'services/quotation';
import Spinner from 'app/common/Spinner';

const QuotationForm = ({ label, type, onDone, disabled }) => {
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await createRent(data);
            setLoading(false)
            if (response.status === 200 && onDone) {
                formik.resetForm();
                onDone()
            };
        } catch (error) {
            console.error('QuotationForm Error: ', error);
        }
    }

    const formik = useFormik({
        initialValues: {
            activity_type: type,
            date: '',
            total: '',
        },
        validate: validateSchema,
        onSubmit: onSubmit,
    });

    const handleChange = ({ target: { name, value } }) => formik.setFieldValue(name, value);

    const handleCreateMonth = () => {
        const _currentDate = moment();
        _currentDate.set('date', 1)
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
                        <CSelect
                            size="lg"
                            md={4}
                            sx={6}
                            disabled={disabled}
                            onChange={handleChange}
                            value={formik.values.date}
                            name="date"
                            className="px-1">
                            <option disabled value="">Periodo</option>
                            {
                                handleCreateMonth()
                            }
                        </CSelect>
                    </CCol>
                    <CCol className="px-0 pr-3 pr-md-0">
                        <CInput
                            size="lg"
                            md={4}
                            sx={6}
                            disabled={disabled}
                            invalid={formik.touched.total && !!formik.errors.total}
                            value={formik.values.total}
                            name="total"
                            placeholder="2.000.000"
                            onChange={handleChange}
                        />
                        <CInvalidFeedback>{formik.errors.total}</CInvalidFeedback>
                    </CCol>
                    <CCol
                        xs={12}
                        md={4}
                        className="pt-3 pt-md-0"
                    >
                        {
                            loading ? <Spinner /> : <CButton type="submit" disabled={formik.values.date.trim() === '' || formik.values.total.trim() === '' || disabled} color="light" size="lg" className="d-inline-flex align-items-center w-100 justify-content-center">
                                <CIcon name="cil-plus" />
                                Agregar
                            </CButton>
                        }

                    </CCol>
                </CRow>

            </CFormGroup>
        </CForm>
    )
}

QuotationForm.defaultProps = {
    disabled: false,
    onDone: () => null
}
QuotationForm.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onDone: PropTypes.func
}

export default QuotationForm
