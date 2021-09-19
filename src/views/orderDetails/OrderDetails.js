import React from 'react'
import PropTypes from 'prop-types'

import {
    CContainer,
    CCol,
    CRow,
    CCard,
    CCardBody,
    CListGroup,
    CListGroupItem,
    CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";


const OrderDetails = props => {

    const list = [
        { name: "Monto solicitado", value: "$10.000.000" },
        { name: "N° de cuotas", value: "24" },
        { name: "Fecha pago", value: "14/09/2021" },
        { name: "Fecha solicitud", value: "14/09/2021" }
    ]

    const listRight = [
        { name: "Valor cuota", value: "$130.000" },
        { name: "Tasa de interés", value: "1,75%" },
        { name: "Costo total", value: "$1.730.000" },
        { name: "Periodo de gracia", value: "3 meses" },
        { name: "Plazo total", value: "72 meses" }
    ]

    return (
        <CContainer className="pt-5">

            <CRow className="justify-content-center">
                <CCol xs={12} md={10}><h1 className="text-primary mb-3">Pre-oferta Santander</h1></CCol>
                <CCol md={10}>
                    <CRow>
                        <CCol md={6}>
                            <CCard>
                                <CCardBody className="py-4">
                                    <div className="text-center" style={{ height: '110px' }}>
                                        <h2 className="text-primary bold">Créditos de consumo</h2>
                                        <p className="text-primary">Información solicitada</p>
                                    </div>

                                    <CListGroup flush className="mb-5">
                                        {
                                            list.map((el) => (
                                                <CListGroupItem key={el.name.replace(' ', '')}>
                                                    <CRow>
                                                        <CCol md={7}>{el.name}</CCol>
                                                        <CCol md={5} className="bold">{el.value}</CCol>
                                                    </CRow>
                                                </CListGroupItem>
                                            ))
                                        }
                                    </CListGroup>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol md={6}>
                            <CCard>
                                <CCardBody className="py-4">
                                    <div className="text-center px-5" style={{ height: '110px' }}>
                                        <img className="w-100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png" alt="" />
                                    </div>

                                    <CRow className="justify-content-center">
                                        <CCol md={10}>
                                            <CListGroup flush className="mb-4">
                                                {
                                                    listRight.map((el) => (
                                                        <CListGroupItem key={el.name.replace(' ', '')}>
                                                            <CRow>
                                                                <CCol md={7}>{el.name}</CCol>
                                                                <CCol md={5} className="bold">{el.value}</CCol>
                                                            </CRow>
                                                        </CListGroupItem>
                                                    ))
                                                }
                                            </CListGroup>
                                        </CCol>
                                    </CRow>

                                    <CRow>
                                        <CCol md={6}>
                                            <CButton className="w-100 mb-3 mb-md-0" size="lg" color="secondary" variant="outline" >Rechazar</CButton>
                                        </CCol>
                                        <CCol md={6}>
                                            <CButton className="w-100" size="lg" color="secondary">Aceptar</CButton>
                                        </CCol>
                                    </CRow>

                                    <div className="d-block text-center mt-4">
                                        <a href="tel:5651234567" className="text-secondary justify-content-center d-flex align-items-center" style={{ fontSize: '18px' }}>
                                            <CIcon name="cil-phone" /> Contactar ejecutivo(a)
                                        </a>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>

        </CContainer>
    )
}



OrderDetails.propTypes = {

}

export default OrderDetails
