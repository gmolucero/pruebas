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
    CModal,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import CardComponent from 'components/cardComponent/CardComponent';
import { getOfferDetails, acceptPreOffer, rejectPreOffer } from 'services/offers';
import Spinner from 'app/common/Spinner';
import { formatClp } from 'utils';


const OrderDetails = props => {
    const { offer_id } = useParams();
    const [data, setData] = React.useState({
        loading: true,
        list: [],
        listRight: [],
        bank: {}
    });
    
    const SUCCESS_MESSAGE = {
        title: "¡Tu preoferta fue aceptada con éxito!",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        btnText: "Cerrar",
        iconName: "cil-check-circle",
        iconClassName: "text-success",
        btnOnClick: () => null,
    }
    
    const ERROR_MESSAGE = {
        title: "",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        btnText: "Cerrar",
        iconName: "cil-warning",
        iconClassName: "text-danger",
        btnOnClick: () => null,
    }

    const CONFIRM_MESSAGE = {
        title: "Rechazar Pre oferta",
        text: "¿Está seguro de rechazar la pre oferta?",
        btnText: "Cerrar",
        iconName: "cil-warning",
        iconClassName: "text-waring",
        btnTextRight:'Confirmar',
        btnOnClick: () => null,
    }

    const [modalConfig, setModalConfig] = React.useState({
        show: false,
        ...ERROR_MESSAGE
    });


    const handleGetInit = async () => {
        try {
            const { data: { result }, status } = await getOfferDetails(offer_id)

            if (status < 400) {
                const _list = [
                    { name: "Monto solicitado", value: `$${formatClp(result.requested_amount)}` },
                    { name: "N° de cuotas", value: result.quotas_offered },
                    { name: "Fecha pago", value: result.pay_day.replace(/-/ig, '/') },
                    { name: "Fecha solicitud", value: result.application_date.replace(/-/ig, '/') },
                    { name: "oferta válida hasta el", value: result.offer_expiration.replace(/-/ig, '/') }
                ]

                const listRight = [
                    { name: "Valor cuota", value: `$${formatClp(result.enhanced_quota_value)}` },
                    { name: "Tasa de interés", value: `${result.interest ? result.interest + '%'  : "-"}` },
                    { name: "CAE", value: `${result.cae ? result.cae + '%'  : "-"}` },
                    { name: "Costo total", value: formatClp(result.requested_amount) },
                    { name: "Periodo de gracia", value: `${result.grace_period || 0} meses` },
                    { name: "Plazo total", value: `${result.total_term || 0} meses` }
                ]
                let executiveListRight =[];

                if(result.executive){
                    executiveListRight = [
                        { name: "Nombre", value: result.executive.name},
                        { name: "Correo", value: result.executive.email},
                        { name: "Teléfono", value: result.executive.phone},
                        
                    ]
                }

                setData({
                    ...result,
                    list: _list,
                    bank: result.bank,
                    listRight,
                    executiveListRight,
                    loading: false
                });
            }

        } catch (error) {
            console.log('error', error);
        }
    }

    const handleAcceptOffer = async () => {
        try {       
            setData({...data, loading:true});     
            const res = await acceptPreOffer(offer_id);
                        
            if (res.status >= 400) {                
                setModalConfig({
                    show: true, ...ERROR_MESSAGE,
                    title:'Ops',
                    text: 'Ocurrió un error al aceptar la pre-oferta',
                    btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false }))
                });   
                setData({...data, loading:false});              
            } else {
                setModalConfig({
                    show: true, ...SUCCESS_MESSAGE,
                    text: 'A partir de ahora puedes contactarte con la institución financiera',
                    btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false }))
                })
                handleGetInit();
                
            }
             

        } catch (error) {
         
            console.log('error', error);
        }
    }

    const handleRejectOffer = async () => {
        setModalConfig((_p) => ({ ..._p, show: false }))
        try {       
            setData({...data, loading:true});     
            const res = await rejectPreOffer(offer_id);
                        
            if (res.status >= 400) {                
                setModalConfig({
                    show: true, ...ERROR_MESSAGE,
                    title:'Ops',
                    text: 'Ocurrió un error al rechazar la pre-oferta',
                    btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false }))
                });   
                setData({...data, loading:false});              
            } else {
                setModalConfig({                    
                    show: true, ...SUCCESS_MESSAGE,
                    title:'Tu preoferta fue rechazada con éxito',
                    text: res.data.message,
                    btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false }))
                })
                handleGetInit();
                
            }
             

        } catch (error) {
         
            console.log('error', error);
        }     
    }

    const handlePreRejectOffer = async () => {
        setModalConfig({                    
            show: true, ...CONFIRM_MESSAGE,     
            btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false })),
            btnRightOnClick : () => handleRejectOffer()
        })    
    }
   
    React.useEffect(() => {
        handleGetInit();
    }, [])

    return (
        <CContainer className="pt-5" id="order-details">

            {
                data.loading ? <Spinner /> :
                    <CRow className="justify-content-center">
                        <CCol xs={12} md={10}><h1 className="text-primary-light mb-3">Pre-oferta {data.bank.name && data.bank.name.toLowerCase()}</h1></CCol>
                        <CCol md={10}>
                            <CRow>
                                <CCol md={6}>
                                    <CCard>
                                        <CCardBody className="py-4">
                                            <div className="text-center mb-3  mt-4" style={{ height: '69px' }}>
                                                <h2 className="text-primary-light bold">CRÉDITOS DE CONSUMO</h2>
                                                <p className="text-primary-light sub-title">Información solicitada</p>
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
                                            
                                            <div className="text-center mb-3 mt-4" >
                                                <img style={{maxHeight:'42px', maxWidth:'190px'}}  src={data.bank.img} alt={data.bank.name} />
                                            </div>
                                            
                                            <CRow className="justify-content-center">
                                                <CCol md={10}>
                                                <div className="text-center" >                                                
                                                    <p className="text-primary-light sub-title">Pre oferta</p>
                                                </div>
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
                                                    {
                                                        data.executiveListRight.length > 1 ? (
                                                            <>
                                                                <div className="text-center" >                                                
                                                                    <p className="text-primary-light sub-title">Ejecutivo</p>
                                                                </div>
                                                                <CListGroup flush className="mb-4">
                                                                    {
                                                                        data.executiveListRight.map((el) => (
                                                                            <CListGroupItem key={el.name.replace(' ', '')}>
                                                                                <CRow>
                                                                                    <CCol md={7}>{el.name}</CCol>
                                                                                    <CCol md={5} className="bold">{el.value}</CCol>
                                                                                </CRow>
                                                                            </CListGroupItem>
                                                                        ))
                                                                    }
                                                                </CListGroup>
                                                            </>
                                                        ) :''
                                                    }
                                                
                                                </CCol>
                                            </CRow>
                                            {
                                                data.client_accepts === 0 &&
                                                <CRow>
                                                    <CCol md={6}>
                                                        <CButton className="w-100 mb-3 mb-md-0" size="lg" color="secondary" onClick={handlePreRejectOffer} variant="outline" >Rechazar</CButton>
                                                    </CCol>
                                                    <CCol md={6}>
                                                        <CButton className="w-100" size="lg" color="secondary" onClick={handleAcceptOffer}>Aceptar</CButton>
                                                    </CCol>
                                                </CRow>
                                            }
                                         

                                            {
                                                data.client_accepts === 1 &&
                                                <div className="d-block text-center mt-4">
                                                    <a href={`tel:${data.executive.phone}`} className="text-secondary justify-content-center d-flex align-items-center bold" style={{ fontSize: '18px' }}>
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
            
            <CModal
                size="lg"
                show={modalConfig.show}
                onClose={() => setModalConfig((_p) => ({ ..._p, show: false }))}
                className="modal-custom"
            >
                <CardComponent {...modalConfig} />
            </CModal>
        </CContainer>
    )
}


OrderDetails.propTypes = {

}

export default OrderDetails
