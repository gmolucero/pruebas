import React from 'react'
import PropTypes from 'prop-types'

import {
    CContainer,
    CCol,
    CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { useLoading } from 'context/hooks';
import Spinner from 'app/common/Spinner';
import StepperComponent from 'components/stepperComponent/StepperComponent';

const TheQuotationLayout = ({ children, step, title, text, backFun }) => {
    const [loading] = useLoading();
    return (
        <CContainer className="pt-5 text-center">
            {
                backFun && <CRow className="text-left">
                    <CCol md={10}>
                        <CIcon onClick={backFun} className="pointer text-light" size="xl" name="cil-arrow-circle-left" />
                    </CCol>
                </CRow>
            }

            <CRow className="justify-content-center">
                <CCol md={10}>
                    <h1 className="text-primary mb-3">{title}</h1>
                    <p className="f-24"> {text}</p>
                </CCol>
            </CRow>
            <CRow className="justify-content-center pt-5 mb-0">
                <CCol md={10}>
                    <StepperComponent active={step} />
                </CCol>
            </CRow>

            <CRow>
                <CCol className="my-5">
                    {
                        loading ? <CRow className="justify-content-center py-5">
                            <CCol md={10}>
                                <Spinner className="" />
                            </CCol>
                        </CRow> : children
                    }
                </CCol>
            </CRow>
        </CContainer>
    )
}

TheQuotationLayout.defaultProps = {
    step: 1,
    title: '¡Necesitamos más datos para que las instituciones financieras puedan hacer sus pre-ofertas!',
    text: 'Las insituciones financieras requieren de datos para generar pre-ofertas personalizadas para ti.'
}

TheQuotationLayout.propTypes = {
    step: PropTypes.oneOf([1, 2, 3]),
    title: PropTypes.string,
    text: PropTypes.string
}

export default TheQuotationLayout
