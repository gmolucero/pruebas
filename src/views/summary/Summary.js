import React from 'react'
import PropTypes from 'prop-types'

import { getSolicitudes } from 'services/quotation';

import {
    CContainer,
    CCol,
    CRow,
    CCard,
    CButton,
    CDataTable
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import StatusBadgeComponent from 'components/statusBadgeComponent/StatusBadgeComponent'
import Pagination from 'components/paginationComponent/PaginationComponent'
import Spinner from 'app/common/Spinner';

const fields = [
    { key: 'inicio_credito', label: "Fecha" },
    { key: 'type', label: "Tipo de crédito" },
    { key: 'principal', label: "Monto" },
    { key: 'estatus', label: "Estado" },
    { key: 'offers', label: "" },
]


const Summary = props => {

    const [loading, setLoading] = React.useState(true)
    const [list, setList] = React.useState([]);

    const handleInit = async () => {
        try {
            const response = await getSolicitudes();
            setList(response.data.result)
            setLoading(false)
        } catch (error) {
            console.error("Summary error: ", error);
        }
    }

    React.useEffect(() => {
        handleInit();
    }, [])

    // const handlePagination = (page) => { console.log('pagina', page); }

    return (
        <CContainer className="pt-5">
            <CRow>
                <CCol md={12}>
                    <h1 className="text-primary mb-3">Mis solicitudes</h1>
                </CCol>
            </CRow>
            <CRow>
                <CCol md={12}>
                    <CCard className="p-3 p-md-4">
                        {

                            loading ? <Spinner /> : <CDataTable
                                items={list}
                                fields={fields}
                                sorter
                                scopedSlots={{
                                    'principal':
                                        (item) => (<td className="bold"> ${item.principal} </td>),
                                    'estatus':
                                        (item) => (<td> <StatusBadgeComponent status={item.estatus === 0 ? 'info' : 'success'} text={item.estatus === 0 ? 'Creado' : 'Finalizado'} /> </td>),
                                    'offers':
                                        (item) => (<td> {
                                            item.preOffers && item.preOffers.length > 0 && <a href={`#/oferta/${item.id}`} className="link bold"> <CIcon name="cil-dollar" /> Ver ofertas</a>
                                        }   </td>),
                                    'actions':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <CButton
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                    >
                                                        <CIcon name="cil-pencil" className="text-primary" />
                                                    </CButton>
                                                    <CButton
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        className="ml-1"
                                                    >
                                                        <CIcon name="cil-trash" className="text-primary" />
                                                    </CButton>
                                                </td>
                                            )
                                        },
                                }}
                            />}
                    </CCard>

                    {
                        // paginationConfig && paginationConfig.pages > 1 && <Pagination {...paginationConfig} onActivePageChange={handlePagination} />
                    }
                </CCol>
            </CRow>
        </CContainer>
    )
}

Summary.propTypes = {

}

export default Summary
