import React, { useState, useEffect } from "react";
import {
    CRow,
    CCol,
    CButton,
    CForm,
} from "@coreui/react";
import ExampleForm from '../../components/example/PrincipalForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';



function New(props) {

    // PARA EL EDITAR
    const [id, setId] = useState(1);

    // OBJETO PARA INICIALIZAR, PUEDE SERVIR PARA CREAR O EDITAR
    const client = {
        address: '',
        advanceInvoice: false,
        bindingOc: false,
        branchInvoicing: '',
        businessAreaCode: '',
        businessName: '',
        communeId: null,
        contact: '',
        contactFinance: '',
        dayToInvoice: '',
        daysInvoice: '',
        dv: '',
        email: '',
        emailFinance: '',
        executiveAccId: null,
        fantasyName: '',
        invoiceType: '',
        invoiceWay: '',
        order: '',
        phone: '',
        phoneFinance: '',
        prefixTypeId: null,
        regionId: null,
        rut: '',
        soflandCod: '',
        typeId: null,
    };


    // CARGA INICIAL DE COSAS
    useEffect(() => {
        document.title = `Cliente - Nuevo Ejemplo`;

        // ESTO SERVIRÁ PARA EL EDITAR, AQUÍ SE DEBERÍA OBTENER LA INFORMACIÓN DESDE UN SERVICIO QUE LLAMA A UNA API
        let clientAPI = {
            ...formik.values,
            rut: '16555',
            dv: '4'
        }

        formik.setValues(clientAPI);

    }, [id]); // SOLO SE DESENCADENARÁ CUANDO LA PROPIEDAD ID CAMBIE

    const validationSchema = Yup.object().shape({
        rut: Yup.string()
            .typeError("Solo caracteres")
            .min(7, 'El mínimo son 7 dígitos')
            .max(10, 'Excede el máximo permitido')
            .required('Requerido'),
        dv: Yup.string()
            .max(1, 'Excede el máximo permitido')
            .required('Requerido'),
    });

    const formik = useFormik({
        initialValues: client,
        validationSchema: validationSchema,
        onSubmit
    });

    function onSubmit() {
        console.info("aquí le pegamos a algún servicio");
        console.info(formik.values);
    }


    return (

        <CRow className="justify-content-center mt-5">
            <CCol xs="12" md="6">
                <CForm className="form-horizontal"
                    onSubmit={formik.handleSubmit}>
                    <ExampleForm
                        data={formik.values}
                        errors={formik.errors}
                        touched={formik.touched}
                        onFormikChange={formik.handleChange}
                        onFormikBlur={formik.handleBlur} />
                    <CButton
                        type="reset"
                        className="px-4 btn-back"
                        size="lg"
                        onClick={() => { alert(formik.values.rut) }}>
                        Test
                    </CButton>
                    <CButton
                        type="submit"
                        className="ml-2 px-5 btn-add"
                        size="lg">
                        Crear
                    </CButton>
                </CForm>
            </CCol>
        </CRow>
    );
}

export default New;
