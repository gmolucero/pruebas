import React, { useState, useEffect } from "react";
import {
    CRow,
    CCol,
    CButton,
    CForm,
} from "@coreui/react";
import ExampleForm from '../../components/example/PrincipalFormSinFormik';



function NewSinFormik(props) {

    // PARA EL EDITAR
    const [id, setId] = useState(1);

    // OBJETO PARA INICIALIZAR, PUEDE SERVIR PARA CREAR O EDITAR
    const [client, setClient] = useState({
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
    });


    // CARGA INICIAL DE COSAS
    useEffect(() => {
        document.title = `Cliente - Nuevo Ejemplo`;

        // ESTO SERVIRÁ PARA EL EDITAR, 
        // AQUÍ SE DEBERÍA OBTENER LA INFORMACIÓN DESDE UN SERVICIO QUE LLAMA A UNA API

        let clientAPI = {
            ...client,
            rut: '16555',
            dv: '4'
        }

        setClient(clientAPI);

    }, [id]); // SOLO SE DESENCADENARÁ CUANDO LA PROPIEDAD ID CAMBIE


    // SIN ESTO LA COSA SE VUELVE LOCA!!
    // PARA CONTROLAR LA ACTUALIZACIÓN DE ESTADO 
    // Y PODAMOS TENER COMPONENTES CONTROLADOS
    function handleChange(event) {
        const { name, value } = event.target;
        setClient({
            ...client,
            [name]: value
        });
    }

    function onSubmit(event) {
        event.preventDefault();
        console.info("aquí le pegamos a algún servicio");
        console.info(client);
    }

    return (

        <CRow className="justify-content-center mt-5">
            <CCol xs="12" md="6">
                <CForm className="form-horizontal"
                    onSubmit={onSubmit}>
                    <ExampleForm
                        data={client}
                        onFormChange={handleChange} />
                    <CButton
                        type="reset"
                        className="px-4 btn-back"
                        size="lg"
                        onClick={() => { alert(client.rut) }}>
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

export default NewSinFormik;
