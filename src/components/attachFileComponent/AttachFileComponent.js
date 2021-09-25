import React from 'react'
import {
    CButton,
    CForm,
    CInput,
    CSelect,
    CFormGroup,
    CLink,
    CRow,
    CCol,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import moment from 'moment';

function AttachFileComponent({ income, amountField }) {
    return (
        <>
            <hr />
            <CRow>
                <CCol lg={5} className="align-items-center d-inline-flex bold">{moment(income.period).format('MMMM YYYY')}  ·  $ {income[amountField]}</CCol>
                <CCol md={4}><CButton color="light" variant="outline" className="d-inline-flex align-items-center w-100 justify-content-center">
                    <CIcon name="cil-paperclip" />
                    Adjuntar archivos
                </CButton>
                </CCol>
                <CCol className="text-right">
                    <CIcon name="cil-x" />
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12} className="text-left mt-2">
                    <label className="bold mb-0">Archivos adjuntos</label>
                </CCol>
                {
                    income.files && income.files.map((_file) => (
                        <CCol key={_file.id} xs={12} className="text-left">
                            <CLink to="#" className="bold text-light d-inline-flex align-items-center">
                                <CIcon name="cil-file" className="mr-2" />
                                {_file.original_name}
                                <CIcon name="cil-x-circle" className="m-2 text-black" />
                            </CLink>
                        </CCol>
                    ))
                }
            </CRow>
        </>
    )
}

AttachFileComponent.defaultProp = {
    amountField: "independent_income"
}

export default AttachFileComponent
