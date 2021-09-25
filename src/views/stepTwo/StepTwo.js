import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from "formik";

import {
    CCol,
    CRow
} from "@coreui/react";

import TheQuotationLayout from 'containers/TheQuotationLayout';

import StepTwoFormComponent from 'components/stepTwoFormComponent/StepTwoFormComponent'

import { getRent } from 'services/quotation';

const StepTwo = props => {

    const [states, setState] = React.useState({
        independent_income: [],
        dependent_income: [],
    })

    const handleInit = async () => {
        try {
            const { data } = await getRent();
            setState(data.result)
            console.log('Data', data);
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    React.useEffect(() => {
        handleInit();
    }, [])

    console.log('states', states);

    return (
        <TheQuotationLayout
            title="Datos financieros"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            step={2}>
            <CRow className="justify-content-center">
                <CCol md={8} lg={6}>
                    <StepTwoFormComponent rent={states} />
                </CCol>
            </CRow>
        </TheQuotationLayout>
    )
}

StepTwo.propTypes = {

}

export default StepTwo
