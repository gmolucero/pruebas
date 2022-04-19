import React from "react";
import PropTypes from 'prop-types'

import {
    CCol,
    CRow,
    CFormGroup,
    CButton,
    CSelect
} from "@coreui/react";

import QuotationForm from 'components/quotationForm/QuotationForm';
import AttachFileComponent from 'components/attachFileComponent/AttachFileComponent';
import Spinner from 'app/common/Spinner';

import { getRent } from 'services/quotation';
import { updateCustomerType } from 'services/customer';

const UserEditRentComponent = () => {

    const [type, setType] = React.useState('ambos');
    const [loading, setLoading] = React.useState(true);

    const [states, setState] = React.useState({
        independent_income: [],
        dependent_income: [],
    })

    const handleUpdateType = async (_value) => {
        try {
            const _temp = type;
            setType(_value);
            const res = await updateCustomerType({
                activity_type: _value
            })
            if (res.status !== 200) setType(_temp);
        } catch (error) {
            console.error('handleUpdateType ERROR: ', error);
        }

    }

    const handleInit = async () => {
        try {
            const { data } = await getRent();
            console.info(data); 
            if (data.result.independent_income && data.result.dependent_income) setType('ambos')
            else if (!data.result.independent_income && data.result.dependent_income) setType('dependiente')
            else if (data.result.independent_income && !data.result.dependent_income) setType('independiente') 
            setState(data.result)
            setType(data.result.activity_type);            

            setLoading(false)
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    React.useEffect(() => {
        handleInit();
    }, [])

    return (
        <CRow className="justify-content-center mb-5">
            {loading ? <Spinner /> : <CCol md={12}>
                <CFormGroup className="d-block d-sm-none">
                    <h3 className="mb-4">Rentas</h3>
                </CFormGroup>
                <CFormGroup className="mb-3 text-left">
                    <label>¿Eres dependiente o independiente?</label>
                    <CSelect size="lg" value={type} onChange={({ target: { value } }) => handleUpdateType(value)}>
                        <option disabled hidden value="">Seleccione</option>
                        <option value="independiente">Independiente</option>
                        <option value="dependiente">Dependiente</option>
                        <option value="ambos">Ambos</option>
                    </CSelect>
                </CFormGroup>

                <p className="text-left"> Cuéntanos de tus ingresos líquidos en los últimos 3 meses </p>
                {
                    type !== 'dependiente' && <>
                        <QuotationForm label="Independiente" type="independent" onDone={handleInit} disabled={states.independent_income && states.independent_income.length >= 3} />

                        {
                            states.independent_income && states.independent_income.map((el) => <AttachFileComponent key={el.id} income={el} type={'independiente'} onDone={handleInit} />)
                        }

                        <hr />
                    </>
                }

                {
                    type !== 'independiente' && <>
                        <QuotationForm label="Dependiente" type="dependent" onDone={handleInit} disabled={states.dependent_income && states.dependent_income.length >= 3} />

                        {
                            states.dependent_income && states.dependent_income.map((el) => <AttachFileComponent key={el.id} income={el} type={'dependiente'} onDone={handleInit} />)
                        }

                    </>
                }


            </CCol>}
        </CRow>
    )
}


// const UserEditRentComponent = () => {
//     return (<>hola</>);
// };

 export default UserEditRentComponent;