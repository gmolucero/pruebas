import React from 'react'
import PropTypes from 'prop-types'

import {
    CContainer,
} from "@coreui/react";


import StepOne from 'views/stepOne/StepOne';
import StepTwo from 'views/stepTwo/StepTwo';
import StepThree from 'views/stepThree/StepThree';

import TheQuotationLayout from 'containers/TheQuotationLayout';
import { useStepper } from 'context/hooks';

const Quotation = (props) => {
    const [step, setStep] = useStepper(1);

    const stepsContent = [
        {
            title: "¡Necesitamos más datos para que las instituciones financieras puedan hacer sus pre-ofertas!",
            text: "Las insituciones financieras requieren de datos para generar pre-ofertas personalizadas para ti.",
            step: 1
        },
        {
            title: "Datos financieros",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            step: 2,
            backFun: () => setStep(1),
        },
        {
            title: "Crédito de consumo",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
            step: 3,
            backFun: () => setStep(2)
        }
    ]

    return (
        <TheQuotationLayout {...stepsContent[step - 1]} >
            {step === 1 && <StepOne next={() => setStep(2)} />}
            {step === 2 && <StepTwo next={() => setStep(3)} prev={stepsContent[step - 1].backFun} />}
            {step === 3 && <StepThree history={props.history} prev={stepsContent[step - 1].backFun} />}
        </TheQuotationLayout>
    )
}

Quotation.propTypes = {

}

export default Quotation
