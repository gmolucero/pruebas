import React from 'react'
import PropTypes from 'prop-types'

import {
    CContainer,
    CCol,
    CRow,
    CCard,
    CButton,
} from "@coreui/react";

import StepperComponent from 'components/stepperComponent/StepperComponent';

const Quotation = props => {
    return (
        <CContainer className="pt-5 text-center">
            <CRow className="justify-content-center pt-5">
                <CCol md={10}>
                    <h1 className="text-primary mb-3">¡Necesitamos más datos para que las instituciones financieras puedan hacer sus pre-ofertas!</h1>
                    <p className="f-24">Las insituciones financieras requieren de datos para generar pre-ofertas personalizadas para ti.</p>
                </CCol>
            </CRow>
            <CRow className="justify-content-center pt-5">
                <CCol md={10}>
                    <StepperComponent active={1} />
                </CCol>
            </CRow>
        </CContainer>
    )
}

Quotation.propTypes = {

}

export default Quotation
