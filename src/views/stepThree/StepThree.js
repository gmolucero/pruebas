import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from "formik";

import {
    CCol,
    CRow,
} from "@coreui/react";

import TheQuotationLayout from 'containers/TheQuotationLayout';

import { stepThreechema as schema } from 'components/stepThreeFormComponent/stepThreechema'
import StepThreeFormComponent from 'components/stepThreeFormComponent/StepThreeFormComponent'

import { validate, handlerInputChangeCreator } from 'utils';

const StepThree = props => {

    const onSubmit = (data) => {
        console.log('data', data);
    }

    const formik = useFormik({
        initialValues: {
            subject: '',
            amount: '',
            fee: '',
            date_first_pay: '',
        },
        validate: validate(schema),
        onSubmit: onSubmit,
    });

    const handleTextChange = handlerInputChangeCreator(formik)

    return (
        <TheQuotationLayout
            title="Crédito de consumo"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            step={3}>
            <CRow className="justify-content-center">
                <CCol md={8} lg={6}>
                    <StepThreeFormComponent
                        formik={formik}
                        onChange={handleTextChange} />
                </CCol>
            </CRow>
        </TheQuotationLayout>
    )
}

StepThree.propTypes = {

}

export default StepThree
