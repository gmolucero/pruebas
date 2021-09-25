import React from "react";
import PropTypes from 'prop-types';
import {
    CRow,
    CCol,
    CModal,
    CModalBody,
    CButton,
    CModalHeader,
    CForm
} from '@coreui/react';

import './modalStyles.scss';

const ModalComponent = ({ toggle, show, leftButtonText, rigthButtonText, children, rightButtonFunc, leftButtonFunc, formik, ...props }) => {
    return (
        <CModal
            size="sm"
            show={show}
            onClose={toggle}
            className="modal-custom"
            {...props}
        >
            <CModalHeader closeButton className="pt-3 pb-2 px-3 modal-header-custom" />
            <CModalBody className="px-4 pt-0">
                <CForm className="form-horizontal" onSubmit={formik.handleSubmit}>

                    {children}

                    <CRow className="pt-3">
                        <CCol className="pr-2">
                            <CButton size="lg" color="btn text-primary rounded-0 w-100 border border-primary" onClick={() => { leftButtonFunc(); toggle() }} >{leftButtonText}</CButton>
                        </CCol>
                        <CCol className="pl-2">
                            <CButton onClick={rightButtonFunc} size="lg" color="primary rounded-0 w-100">{rigthButtonText}</CButton>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
        </CModal>
    )
}

ModalComponent.defaultProps = {
    rigthButtonText: 'Crear',
    rightButtonFunc: () => null,
    leftButtonText: 'Cancelar',
    leftButtonFunc: () => null,
    formik: {
        handleSubmit: () => console.log('Funcion envio no definida en formik')
    },
}

ModalComponent.propTypes = {
    rigthButtonText: PropTypes.string,
    rightButtonFunc: PropTypes.func,
    leftButtonText: PropTypes.string,
    leftButtonFunc: PropTypes.func,
    formik: PropTypes.object
}

export default ModalComponent;