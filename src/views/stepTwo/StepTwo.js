import React from 'react'
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

const StepTwo = ({ next, prev, stepsContent,setStepsContent }) => {

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
            if (data.result.independent_income && data.result.dependent_income) setType('ambos')
            else if (!data.result.independent_income && data.result.dependent_income) setType('dependiente')
            else if (data.result.independent_income && !data.result.dependent_income) setType('independiente') 
            setState(data.result)
            setType(data.result.activity_type);            
            if(data.result.hasDebt){
                setStepsContent([...stepsContent, stepsContent[1].title = 'Actualizar Datos financieros' ])
            }  
            setLoading(false)
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    React.useEffect(() => {
        handleInit();
    }, [])

    return (
        <CRow className="justify-content-center">
            {loading ? <Spinner /> : <CCol md={8} lg={6}>

                <CFormGroup className="mb-3 text-left">
                    <label>¿Eres dependiente o independiente?</label>
                    <CSelect size="lg" value={type} onChange={({ target: { value } }) => handleUpdateType(value)}>
                        <option value="">Seleccione</option>
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
                            states.independent_income && states.independent_income.map((el) => <AttachFileComponent key={el.id} income={el} onDone={handleInit} />)
                        }

                        <hr />
                    </>
                }

                {
                    type !== 'independiente' && <>
                        <QuotationForm label="Dependiente" type="dependent" onDone={handleInit} disabled={states.dependent_income && states.dependent_income.length >= 3} />

                        {
                            states.dependent_income && states.dependent_income.map((el) => <AttachFileComponent key={el.id} income={el} onDone={handleInit} />)
                        }

                    </>
                }

                <CRow className="justify-content-center">
                    <CCol xs="12" sm="6" xl="5" className="pt-3">
                        <CButton onClick={prev} color="secondary" size="lg" variant="outline" className="px-4 w-100" >
                            Volver
                        </CButton>
                    </CCol>
                    <CCol xs="12" sm="6" xl="5" className="pt-3">
                        <CButton onClick={next} color="secondary" size="lg" className="btn-login px-4 w-100" >
                            continuar
                        </CButton>
                    </CCol>
                </CRow>

            </CCol>}
        </CRow>
    )
}

StepTwo.defaultProps = {
    next: () => null,
    prev: () => null
}

StepTwo.propTypes = {
    next: PropTypes.func,
    prev: PropTypes.func
}


export default StepTwo
