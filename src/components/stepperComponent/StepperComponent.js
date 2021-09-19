import React from 'react'
import PropTypes from 'prop-types'

import './stepperComponentStyles.scss';

const StepperComponent = ({ active }) => {
    return (
        <>
            <div className="drop-container">
                {
                    [1, 2, 3].map((el) => (<div key={el} className={`drop ${active >= el ? 'active' : ''}`}>{el}</div>))
                }
            </div>
        </>
    )
}

StepperComponent.defaultProps = {
    active: 3
}

StepperComponent.propTypes = {
    active: PropTypes.oneOf([1, 2, 3])
}

export default StepperComponent
