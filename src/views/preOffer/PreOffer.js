import React from 'react'
import { useParams } from "react-router-dom";
import {
    CContainer,
    CCol,
    CRow,
} from "@coreui/react";

import OrderBoxComponent from 'components/orderBoxComponent/OrderBoxComponent';
import Spinner from 'app/common/Spinner';

import { getPreOffer } from 'services/offers';

const PreOffer = () => {
    const { offer_id } = useParams();
    const [offers, setOffers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

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
                            offers.map((el) => <CCol key={el.id} md="4" sm="6" xs="12"> <OrderBoxComponent {...el} /></CCol>)
                        }
                    </CRow>
            }
        </CContainer>
    )
}

export default PreOffer
