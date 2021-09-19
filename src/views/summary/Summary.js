import React from 'react'
import PropTypes from 'prop-types'

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

const fields = [
    { key: 'date', label: "Fecha" },
    { key: 'type', label: "TIPO DE CRÉDITO" },
    { key: 'amount', label: "Monto" },
    { key: 'status', label: "Estado" },
    { key: 'actions', label: "Acciones" },
    { key: 'offers', label: "" },
]


const Summary = props => {

    const [paginationConfig] = React.useState(null)

    const list = [
        { id: 1, date: "14/09/2021", type: "Crédito de consumo", amount: "$10.000.000", status: 'warning' },
        { id: 2, date: "14/09/2021", type: "Crédito de consumo", amount: "$10.000.000", status: 'info' },
        { id: 3, date: "14/09/2021", type: "Crédito de consumo", amount: "$10.000.000", status: 'warning' },
        { id: 4, date: "14/09/2021", type: "Crédito de consumo", amount: "$10.000.000", status: 'success' },
    ]

    const handlePagination = (page) => { console.log('pagina', page); }

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
                        <CDataTable
                            items={list}
                            fields={fields}
                            sorter
                            scopedSlots={{
                                'amount':
                                    (item) => (<td className="bold"> {item.amount} </td>),
                                'status':
                                    (item) => (<td> <StatusBadgeComponent status={item.status} /> </td>),
                                'offers':
                                    (item) => (<td>  <a href="#/" className="link"> <CIcon name="cil-dollar" /> Ver ofertas</a> </td>),
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
                        />
                    </CCard>

                    {
                        paginationConfig && paginationConfig.pages > 1 && <Pagination {...paginationConfig} onActivePageChange={handlePagination} />
                    }
                </CCol>
            </CRow>
        </CContainer>
    )
}

Summary.propTypes = {

}

export default Summary
