import React from 'react';
import PropTypes from 'prop-types';
import {
    CCard,
    CCol,
    CRow,
    CButton,
    CCardBody
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import './styles.scss';

const CardComponent = ({ title, btnText, text, iconName, iconClassName, btnOnClick, children }) => {
    return (
        <CRow className="justify-content-center">
            <CCol md={12}>
                <CCard className="text-center py-3 mb-0">
                    <CCardBody className="px-3 px-md-5">
                        <CIcon className={`${iconClassName} mb-4`} name={iconName} style={{ width: "155px", height: "155px" }} />
                        <h1 className="text-primary">{title}</h1>
                        <p className="px-4 f-24 mb-4">{text}</p>
                        {children}
                        <CButton size="lg" onClick={btnOnClick} className="btn-secondary px-4">{btnText}</CButton>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

CardComponent.defaultProps = {
    iconName: "cil-check-circle",
    // iconName: "cil-warning",
    iconClassName: "text-success",
    title: "¡Tu cotización de Crédito de Consumo fue enviada con éxito!",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    btnText: "Ir a producto",
    btnOnClick: () => null
}

CardComponent.propTypes = {
    iconName: PropTypes.string,
    iconClassName: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    btnText: PropTypes.string,
    btnOnClick: PropTypes.func
}

export default CardComponent;