import React from 'react'
import PropTypes from 'prop-types'

import {
    CContainer,
} from "@coreui/react";


import StepOne from 'views/stepOne/StepOne';
import StepThree from 'views/stepThree/StepThree';

const Quotation = (props) => {
    return (
        <CContainer className="pt-5 text-center">
            <StepOne />
            <StepThree />
        </CContainer>
    )
}

Quotation.propTypes = {

}

export default Quotation
