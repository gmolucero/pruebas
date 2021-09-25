import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from "formik";

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

const StepTwo = ({ next }) => {

    const [type, setType] = React.useState('2');
    const [loading, setLoading] = React.useState(true);

    const [states, setState] = React.useState({
        independent_income: [],
        dependent_income: [],
    })

    const handleInit = async () => {
        try {
            const { data } = await getRent();

            if (data.result.independent_income && data.result.dependent_income) setType('2')
            else if (!data.result.independent_income && data.result.dependent_income) setType('1')
            else if (data.result.independent_income && !data.result.dependent_income) setType('0')

            setState(data.result)
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
                    <CSelect size="lg" value={type} onChange={({ target: { value } }) => setType(value)}>
                        <option value="0">Independiente</option>
                        <option value="1">Dependiente</option>
                        <option value="2">Ambos</option>
                    </CSelect>
                </CFormGroup>

                <p className="text-left"> Cuéntanos de tus ingresos líquidos en los últimos 3 meses </p>
                {
                    type !== '1' && <>
                        <QuotationForm label="Independiente" />

                        {
                            states.independent_income && states.independent_income.map((el) => <AttachFileComponent key={el.id} income={el} amountField="independent_income" />)
                        }

                        <hr />
                    </>
                }

                {
                    type !== '0' && <>
                        <QuotationForm label="Dependiente" />

                        {
                            states.dependent_income && states.dependent_income.map((el) => <AttachFileComponent key={el.id} income={el} amountField="dependent_income" />)
                        }

                    </>
                }

                <CButton onClick={next} color="secondary" size="lg" className="btn-login d-inline px-4 mt-5" >
                    continuar
                </CButton>

            </CCol>}
        </CRow>
    )
}

StepTwo.propTypes = {

}

export default StepTwo
