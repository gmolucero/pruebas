import React from 'react'
import { useParams } from "react-router-dom";
import {
    CContainer,
    CCol,
    CRow,
    CModal,
} from "@coreui/react";

import OrderBoxComponent from 'components/orderBoxComponent/OrderBoxComponent';
import CardComponent from 'components/cardComponent/CardComponent';
import Spinner from 'app/common/Spinner';
import { acceptPreOffer } from 'services/offers';
import { getPreOffer } from 'services/offers';

const PreOffer = () => {
    const { offer_id } = useParams();
    const [offers, setOffers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);    
    const SUCCESS_MESSAGE = {
        title: "¡Tu preoferta fue aceptada con éxito!",
        text: "",
        btnText: "Cerrar",
        iconName: "cil-check-circle",
        iconClassName: "text-success",
        btnOnClick: () => null,
    }
    
    const ERROR_MESSAGE = {
        title: "Tu cotización no pudo ser enviada.",
        text: "",
        btnText: "Cerrar",
        iconName: "cil-warning",
        iconClassName: "text-danger",
        btnOnClick: () => null,
    }

    const [modalConfig, setModalConfig] = React.useState({
        show: false,
        ...ERROR_MESSAGE
    })

    const handleInit = async () => {
        try {
            const response = await getPreOffer(offer_id)
            setLoading(false);
            if (response.status < 400) {
                setOffers(response.data.result)
            }
        } catch (error) {
            console.error('PreOffer Error: ', error);
        }
    }

    const handleAcceptOffer = async (offer_id) => {       
        try {       
            setLoading(true);     
            const res = await acceptPreOffer(offer_id);
                        
            if (res.status >= 400) {                
                setModalConfig({
                    show: true, ...ERROR_MESSAGE,
                    title:'Ops',
                    text: 'Ocurrió un error al aceptar la pre-oferta',
                    btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false }))
                });   
                setLoading(false);             
            } else {
                setModalConfig({
                    show: true, ...SUCCESS_MESSAGE,
                    text: 'A partir de ahora puedes contactarte con la institución financiera',
                    btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false }))
                })
                handleInit();
            }
             

        } catch (error) {
         
            console.log('error', error);
        }
    }

    React.useEffect(() => {
        handleInit();
    }, [])

    return (
        <CContainer className="pt-5" id="pre-offer">
            <h1 className="text-primary-light mb-4">Pre-ofertas</h1>
            {
                loading ? <Spinner /> :
                    <CRow>
                        {
                            offers.map((el) => <CCol key={el.id} md="4" sm="6" xs="12"> <OrderBoxComponent {...el} handleAcceptOffer={handleAcceptOffer} /></CCol>)
                        }
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

export default PreOffer
