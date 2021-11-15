import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
    CContainer,
} from "@coreui/react";


import StepOne from 'views/stepOne/StepOne';
import StepTwo from 'views/stepTwo/StepTwo';
import StepThree from 'views/stepThree/StepThree';

import TheQuotationLayout from 'containers/TheQuotationLayout';
import { useStepper, useStepData } from 'context/hooks';

const Quotation = (props) => {
    const [step, setStep] = useStepper(1);
    const [stepKeepData, setStepKeepData] = useStepData('');
    const [stepsContent, setStepsContent ]= useState([
        {
            title: "Hola!! Necesitamos algunos datos para que las Instituciones Financieras puedan realizar una Pre-Oferta a tu medida!!",
            // text: "Las insituciones financieras requieren de datos para generar pre-ofertas personalizadas para ti.",
            text:"Sólo Son 3 pasos!",
            step: 1
        },
        {
            title: "Datos financieros",
            text: "Cuéntanos un poco de tus ingresos, de está forma obtendrás Pre-ofertas pensadas en ti.",
            step: 2,
            backFun: () => setStep(1),
        },
        {
            title: "Crédito de consumo",
            text: "Ya estamos casi!! Ingresa tu requerimiento y esto se mostrará a los ejecutivos!!",
            step: 3,
            backFun: () => setStep(2)
        }
    ])

    return (
        <TheQuotationLayout {...stepsContent[step - 1]} >
            {step === 1 && <StepOne next={() => setStep(2)} stepsContent={stepsContent} setStepsContent={setStepsContent}/>}
            {step === 2 && <StepTwo next={() => setStep(3)} prev={stepsContent[step - 1].backFun} stepsContent={stepsContent} setStepsContent={setStepsContent}/>}
            {step === 3 && <StepThree history={props.history} prev={stepsContent[step - 1].backFun} setStepKeepData={setStepKeepData} stepKeepData={stepKeepData}/>}
        </TheQuotationLayout>
    )
}

Quotation.propTypes = {

}

export default Quotation
