import React, { useState } from "react";
import { useFormik } from "formik";
import {
  CCol,
  CContainer,
  CRow,
  CSpinner
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { editRegister } from 'services/login';

import { validate, handlerInputChangeCreator } from 'utils';
import { EditsignupSchema as schema } from 'components/signupFormComponent/signupSchema';

import PublicLayout from 'containers/ThePublicLayout.js';
import SignupFormComponent from 'components/signupFormComponent/SignupFormComponent';

import { useNotification } from 'context/hooks';

import ImgFondo from "../../assets/img/bg-1.png";
import { formatRut, RutFormat } from '@fdograph/rut-utilities';

var styles = {
  backgroundImage: `url(${ImgFondo})`,
  backgroundSize: "cover",
};

const EditSingUp = ({ history }) => {
  const [visible, setVisible] = useState(true);
  const [, setNotification] = useNotification();
  // const [err, setErrors] = useState([]);
  // const [keys, setKeys] = useState([]);


  const onSubmit = async (user) => {
    try {
      setVisible(false);
      const { status, data } = await editRegister(user);      
      if (status > 400) {
        let keys= Object.keys(data.errors);                
        let err = data.errors;
           
        setNotification({ type: 'warning', message: (
          <ul> 
            {keys.map((key) => (
              err[key].map((item,index) => {
                return <li key={index} className="mb-2">{item}</li>
              })  
            
            ))}  
          </ul>
        ), delay: 8000 })
        setVisible(true)
      }
      else {
        setNotification({ type: 'success', message: 'Usuario editado correctamente.', delay: 8000 })
        history.push("/")
      }
    } catch (error) {
      console.error('[onSubmit Error] form', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      rut: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      term: false
    },
    validate: validate(schema),
    onSubmit: onSubmit,
  });

  const handleTextChange = handlerInputChangeCreator(formik)

  const changeRut = (e) =>{
   const {value} = e.target; 
   let format = (formatRut(value, RutFormat.DOTS_DASH));   
   formik.setValues({...formik.values,rut:format})
  }
  
  return (

    
    <div
    className="c-app c-default-layout flex-row bg-public"
    >
        <CContainer fluid={true}>
            <CRow className="justify-content-center h-100">
            <CCol md="6" style={styles} className="align-items-center bg-gradient-blue">
                <div className="d-flex h-100 justify-content-center align-items-center text-center flex-column text-white p-relative">
                <h1 className="bold f-48 mt-5 mt-md-0">Actualizar Datos</h1>
                <p className="mb-5 h3 px-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas fugit cupiditate ut mollitia itaque, accusamus beatae qui eaque corporis excepturi. </p>

                {/* <ul className="login-list p-0">
                    <li><CIcon name="cil-clock" /> Ahorra tiempo y solicita tu crédito.</li>
                    <li><CIcon name="cil-find-in-page" /> Te llegarán pre-ofertas personalizadas.</li>
                    <li><CIcon name="cil-chat-bubble" /> Negocia la pre-oferta de tu crédito.</li>
                </ul> */}
                </div>
            </CCol>

            <CCol md="6">
                <CRow className="justify-content-center align-items-center h-100">
                <CCol md={8}>
                    {visible ? <SignupFormComponent formik={formik} onChange={handleTextChange} changeRut={changeRut} edit={true} /> : <div className="text-center"><CSpinner color="light" /></div>}
                </CCol>
                </CRow>
            </CCol>
            </CRow>
        </CContainer>
    </div>
  


  );
};

export default EditSingUp;
