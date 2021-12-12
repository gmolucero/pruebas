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
        listLeft: [],
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
                    { name: "a) Monto solicitado", value: `$${formatClp(result.requested_amount)}` },
                    { name: "b) N° de cuotas", value: result.quotas_offered },
                    { name: "c) Pago primera cuota", value: result.pay_day.replace(/-/ig, '/') },
                    { name: "d) Fecha solicitud", value: result.application_date.replace(/-/ig, '/') },
                ]

                const listLeft = [
                    { name: "e) Valor cuota", value: `$${formatClp(result.enhanced_quota_value)}` },
                    { name: "f) Tasa de interés mensual", value: `${result.interest ? result.interest + '%'  : "-"}` },
                    { name: "g) Tasa de interés anual", value: `${result.annual_rate ? result.annual_rate + '%'  : "-"}` },
                    { name: "h) Costo anual equivalente (CAE)", value: `${result.cae ? result.cae + '%'  : "-"}` },
                    { name: "i) Costo total", value: formatClp(result.requested_amount) },
                    { name: "j) Periodo de gracia", value: `${result.grace_period || 0}  ${ result.grace_period !== 1 ? 'meses' : 'mes' }` },
                    { name: "k) Plazo total", value: `${result.total_term || 0} ${ result.total_term !== 1 ? 'meses' : 'mes' }` }
                ]

                const listRight = [
                    { name: "l) Seguro mensual", value: `$${formatClp(result.insurance)}` },
                    { name: "m) Impuesto a timbres y estampillas", value: `$${formatClp(result.tax)}` },
                    { name: "n) Gastos notariales", value: `$${formatClp(result.notarial_spending)}` },
                    { name: "o) Monto Bruto", value: `$${formatClp(result.gross_amount)}`, info: `(l)+(m)+(n)+(a)`},
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
                    listLeft,
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
                        <CCol md={12}>
                            <CRow>
                                <CCol md={4}>
                                    <CCard className='magic-box' >
                                        <CCardBody className="py-4">
                                            <div className="text-center mb-3  mt-4" >
                                                <h2 className="text-primary-light bold">CRÉDITOS DE CONSUMO</h2>
                                                <p className="text-primary-light sub-title">Información solicitada</p>
                                            </div>

                                            <CListGroup flush className="mb-5">
                                                {
                                                    data.list.map((el) => (
                                                        <CListGroupItem className="px-0 px-md-3" key={el.name.replace(' ', '')}>
                                                            <CRow className="px-0">
                                                                <CCol md={12} style={{ fontSize:12 }}>{el.name}</CCol>
                                                                <CCol md={12} className="bold">{el.value}</CCol>
                                                            </CRow>
                                                        </CListGroupItem>
                                                    ))
                                                }
                                            </CListGroup>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol md={8}>
                                    <CCard>
                                        <CCardBody className="py-4">
                                            
                                            <div className="text-center mb-3 mt-4" >
                                                <img style={{maxHeight:'42px', maxWidth:'190px'}}  src={data.bank.img} alt={data.bank.name} />
                                            </div>
                                            
                                            <CRow className="justify-content-center">
                                                <CCol md={12} lg={8}>
                                                <div className="text-center" >                                                
                                                    <p className="text-primary-light sub-title">Pre oferta</p>
                                                </div>
                                                    <CRow className="justify-content-center">
                                                        <CCol md={6}>
                                                        <CListGroup flush className="mb-4">
                                                            {
                                                                data.listLeft.map((el) => (
                                                                    <CListGroupItem key={el.name.replace(' ', '')}>
                                                                        <CRow>
                                                                            <CCol md={12} style={{ fontSize:12 }}>{el.name}</CCol>
                                                                            <CCol md={12} className="bold">{el.value}</CCol>
                                                                        </CRow>
                                                                    </CListGroupItem>
                                                                ))
                                                            }
                                                        </CListGroup>
                                                        </CCol>
                                                        <CCol md={6}>
                                                            <CListGroup flush className="mb-4">
                                                                {
                                                                    data.listRight.map((el) => (
                                                                        <CListGroupItem key={el.name.replace(' ', '')}>
                                                                            <CRow>
                                                                                <CCol md={12} style={{ fontSize:12 }}>{el.name}</CCol>
                                                                                <CCol md={12} className="bold">{el.value}</CCol>
                                                                                <CCol md={12} style={{ fontSize:12, color: 'grey' }}>{el.info ?? ''}</CCol>
                                                                            </CRow>
                                                                        </CListGroupItem>
                                                                    ))
                                                                }
                                                            </CListGroup>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>
                                                <CCol md={12} lg={4}>
                                                <div className="text-center" >                                                
                                                    <p className="text-primary-light sub-title">Ejecutivo</p>
                                                </div>
                                                {
                                                            data.executiveListRight.length > 1 ? (
                                                                <>

                                                                    <CListGroup flush className="mb-4">
                                                                        {
                                                                            data.executiveListRight.map((el) => (
                                                                                <CListGroupItem key={el.name.replace(' ', '')}>
                                                                                    <CRow>
                                                                                        <CCol md={12} style={{ fontSize:12 }}>{el.name}</CCol>
                                                                                        <CCol md={12} className="bold">{el.value}</CCol>
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
