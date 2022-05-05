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
    { key: 'fecha', label: "Fecha", _classes: "sticky"},
    { key: 'tipo_deuda_nombre', label: "Tipo de crédito", _classes: "" },
    { key: 'monto', label: "Monto", _classes: "" },
    { key: 'motivo_nombre', label: "Motivo", _classes: "" },
    // { key: 'estatus', label: "Estado" },
    { key: 'offers', label: "" },
]



const Summary = props => {
    const [step, setStepper] = useStepper();
    const [loading, setLoading] = React.useState(true);
    const [list, setList] = React.useState([]);
    const [stepKeepData, setStepKeepData] = useStepData('');
    const [onStart, setOnStart ] = React.useState(true);
    const [onEnd, setOnEnd ] = React.useState(true);
    const ref = React.createRef();

    const handleInit = async () => {
        try {
            const response = await getSolicitudes();
            setList( response.data.result.map(item =>{
              item['motivo_nombre'] = item.motivo.nombre;
              item['tipo_deuda_nombre'] = item.tipo.nombre;
              item['monto'] = '$'+formatClp(item.principal);
              return item;
            }) );
            setLoading(false);
            setOnStart(false);
            setOnEnd(false);
        } catch (error) {
            console.error("Summary error: ", error);
        }
    }

    const Buttons = () => {
      return (<div className="d-block d-sm-none text-right my-2">
      <CButton
        className="mr-2"
        shape="square"
        disabled={onStart}
        onClick={()=>scrollTableTo('left')}
        >
          <CIcon name="cil-arrow-left"/>
      </CButton>
      <CButton
        shape="square"
        disabled={onEnd}
        onClick={()=>scrollTableTo('right')}
      >
          <CIcon name="cil-arrow-right"/>
      </CButton>
    </div>);
    }

    function scrollTableTo(direction, step = 100) {
      const elem = document.getElementsByClassName('table-responsive')[0];
      elem.scrollTo({
        left: direction === 'left' ? (-1)*step : step,
        behavior: 'smooth'
      });
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
                        <CDataTable
                                items={list}
                                fields={fields}
                                pagination={{align:'end', dots:false, doubleArrows:false}}
                                responsive
                                loading={loading}
                                sorter
                                overTableSlot = {<Buttons/>}
                                underTableSlot = {<Buttons/>}
                                scopedSlots={{
                                    'offers':
                                        (item) => (<td> {
                                            item.preOffers && item.preOffers.length > 0 && <a href={`#/oferta/${item.id}`} className="link bold"> <CIcon name="cil-dollar" /> Ver pre-ofertas</a>
                                        }   </td>),

                                }}
                                innerRef={ref}
                            />
                    </CCard>
                    {
                        // paginationConfig && paginationConfig.pages > 1 && <Pagination {...paginationConfig} onActivePageChange={handlePagination} />
                    }
                </CCol>
            </CRow>
        </CContainer>
    )
}


export default Summary
