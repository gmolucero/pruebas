import React from 'react'
import PropTypes from 'prop-types'

import {
    CContainer,
} from "@coreui/react";


import StepOne from 'views/stepOne/StepOne';
import StepTwo from 'views/stepTwo/StepTwo';
import StepThree from 'views/stepThree/StepThree';

const Quotation = (props) => {

    const [step, setStep] = React.useState(2);

    return (
        <>

            {step === 1 && <StepOne next={() => setStep(2)} />}
            {step === 2 && <StepTwo next={() => setStep(3)} />}
            {step === 3 && <StepThree />}

        </>
    )
}

Quotation.propTypes = {

}

export default Quotation
