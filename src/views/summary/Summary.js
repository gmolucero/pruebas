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

// import StatusBadgeComponent from 'components/statusBadgeComponent/StatusBadgeComponent'
// import Pagination from 'components/paginationComponent/PaginationComponent'
import Spinner from 'app/common/Spinner';
import { formatClp } from 'utils';
import { useStepper,useStepData} from 'context/hooks';

const fields = [
    { key: 'fecha', label: "Fecha" },
    { key: 'type', label: "Tipo de crédito" },
    { key: 'principal', label: "Monto" },
    { key: 'motivo', label: "Motivo" },
    // { key: 'estatus', label: "Estado" },
    { key: 'offers', label: "" },
]


const Summary = props => {
    const [step, setStepper] = useStepper();
    const [loading, setLoading] = React.useState(true);
    const [list, setList] = React.useState([]);
    const [stepKeepData, setStepKeepData] = useStepData('');

    const handleInit = async () => {
        try {
            const response = await getSolicitudes();
            setList(response.data.result);
            setLoading(false);
        } catch (error) {
            console.error("Summary error: ", error);
        }
    }

    React.useEffect(() => {
        handleInit();
    }, [])

    React.useEffect(() => {       
        if (step !== 1) setStepper(1)
        if (stepKeepData) setStepKeepData('')
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
                                pagination={{align:'end', dots:false, doubleArrows:false}}
                                sorter
                                scopedSlots={{
                                    'fecha':
                                        (item) => (<td> {item.fecha ? item.fecha :"-"} </td>),
                                    'principal':
                                        (item) => (<td className="bold"> ${formatClp(item.principal)} </td>),
                                    'type':
                                        (item) => (<td>{item.tipo.nombre}</td>),
                                    'motivo':
                                        (item) => (<td>{item.motivo ? item.motivo.nombre : "-"}</td>),
                                    // 'estatus':
                                    //     (item) => (<td> <StatusBadgeComponent status={item.estatus === 0 ? 'info' : 'success'} text={item.estatus === 0 ? 'Creado' : 'Finalizado'} /> </td>),
                                    'offers':
                                        (item) => (<td> {
                                            item.preOffers && item.preOffers.length > 0 && <a href={`#/oferta/${item.id}`} className="link bold"> <CIcon name="cil-dollar" /> Ver pre-ofertas</a>
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
