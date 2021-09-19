import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from "formik";

import {
    CCol,
    CRow
} from "@coreui/react";

import TheQuotationLayout from 'containers/TheQuotationLayout';

import { stepOnechema as schema } from 'components/stepOneFormComponent/stepOnechema'
import StepOneFormComponent from 'components/stepOneFormComponent/StepOneFormComponent'

import { validate, handlerInputChangeCreator } from 'utils';

const StepOne = props => {

    const onSubmit = (data) => {
        console.log('data', data);
    }

    const formik = useFormik({
        initialValues: {
            birthdate: '',
            region: '',
            commune: '',
            knowledge: '',
            ocupation: ''
        },
        validate: validate(schema),
        onSubmit: onSubmit,
    });

    const handleTextChange = handlerInputChangeCreator(formik)

    return (
        <TheQuotationLayout
            title="¡Necesitamos más datos para que las instituciones financieras puedan hacer sus pre-ofertas!"
            text="Las insituciones financieras requieren de datos para generar pre-ofertas personalizadas para ti."
            step={1}>
            <CRow className="justify-content-center">
                <CCol md={8} lg={6}>
                    <StepOneFormComponent formik={formik} onChange={handleTextChange} />
                </CCol>
            </CRow>
        </TheQuotationLayout>
    )
}

StepOne.propTypes = {

}

export default StepOne
