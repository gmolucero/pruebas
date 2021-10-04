import React from 'react'
import { useParams } from "react-router-dom";
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

import { getOfferDetails } from 'services/offers';
import Spinner from 'app/common/Spinner';

const OrderDetails = props => {
    const { offer_id } = useParams();
    const [data, setData] = React.useState({
        loading: true,
        list: [],
        listRight: [],
        bank: {}
    })

    const handleGetInit = async () => {
        try {
            const { data: { result }, status } = await getOfferDetails(offer_id)

            if (status < 400) {
                const _list = [
                    { name: "Monto solicitado", value: `$${result.requested_amount}` },
                    { name: "N° de cuotas", value: result.quotas_offered },
                    { name: "Fecha pago", value: result.pay_day.replace(/-/ig, '/') },
                    { name: "Fecha solicitud", value: result.application_date.replace(/-/ig, '/') }
                ]

                const listRight = [
                    { name: "Valor cuota", value: `$${result.enhanced_quota_value}` },
                    { name: "Tasa de interés", value: `${result.interest}%` },
                    { name: "Costo total", value: result.requested_amount },
                    { name: "Periodo de gracia", value: `${result.grace_period || 0} meses` },
                    { name: "Plazo total", value: `${result.total_term || 0} meses` }
                ]

                setData({
                    ...result,
                    list: _list,
                    bank: result.bank,
                    listRight,
                    loading: false
                });
            }

        } catch (error) {
            console.log('error', error);
        }
    }

    React.useEffect(() => {
        handleGetInit();
    }, [])

    return (
        <CContainer className="pt-5">

            {
                data.loading ? <Spinner /> :
                    <CRow className="justify-content-center">
                        <CCol xs={12} md={10}><h1 className="text-primary mb-3">Pre-oferta {data.bank.name && data.bank.name.toLowerCase()}</h1></CCol>
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
                                                    data.list.map((el) => (
                                                        <CListGroupItem className="px-0 px-md-3" key={el.name.replace(' ', '')}>
                                                            <CRow className="px-0">
                                                                <CCol xs={7} md={7}>{el.name}</CCol>
                                                                <CCol xs={5} md={5} className="bold">{el.value}</CCol>
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
                                                <img className="w-100" src={data.bank.img} alt={data.bank.name} />
                                            </div>

                                            <CRow className="justify-content-center">
                                                <CCol md={10}>
                                                    <CListGroup flush className="mb-4">
                                                        {
                                                            data.listRight.map((el) => (
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

                                            {
                                                data.client_accepts === 1 &&
                                                <div className="d-block text-center mt-4">
                                                    <a href={`tel:${data.executive.phone}`} className="text-secondary justify-content-center d-flex align-items-center" style={{ fontSize: '18px' }}>
                                                        <CIcon name="cil-phone" className="mr-1" /> Contactar ejecutivo(a)
                                                    </a>
                                                </div>
                                            }
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
            }
        </CContainer>
    )
}


OrderDetails.propTypes = {

}

export default OrderDetails
