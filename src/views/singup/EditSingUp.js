import React, { useState } from "react";
import { useFormik } from "formik";
import {
  CCol,
  CContainer,
  CRow,
  CSpinner
} from "@coreui/react";
import { editRegister, getUser } from 'services/login';
import { validate, handlerInputChangeCreator } from 'utils';
import { EditsignupSchema as schema } from 'components/signupFormComponent/signupSchema';
import UserEditNavComponent from 'components/userComponent/UserEditNavComponent';
import SignupFormComponent from 'components/signupFormComponent/SignupFormComponent';
import { useNotification } from 'context/hooks';
import ImgFondo from "../../assets/img/bg-1.png";
import { formatRut, RutFormat } from '@fdograph/rut-utilities';

var styles = {
  backgroundImage: `url(${ImgFondo})`,
  backgroundSize: "cover",
};

const EditSingUp = ({ history }) => {
  const [visible, setVisible] = useState(false);
  const [, setNotification] = useNotification();

  const onSubmit = async (user) => {
    try {
      setVisible(false);
      let tempPhone = "+569" + user.phone
      let tempUser = { ...user, phone: tempPhone }
      const { status, data } = await editRegister(tempUser);
      if (status > 400) {
        let keys = Object.keys(data.errors);
        let err = data.errors;

        setNotification({
          type: 'warning', message: (
            <ul>
              {keys.map((key) => (
                err[key].map((item, index) => {
                  return <li key={index} className="mb-2">{item}</li>
                })

              ))}
            </ul>
          ), delay: 8000
        })
        setVisible(true)
      }
      else {
        setNotification({ type: 'success', message: 'Datos actualizados correctamente.', delay: 8000 });
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

  const handleInit = async () => {
    try {
      const { data } = await getUser();
      formik.setValues({
        name: data.result.name || '',
        rut: data.result.rut || '',
        email: data.result.email || '',
        phone: data.result.phone.split('+569').pop() || '',
        password: '',
        password_confirmation: ''
      });
      setVisible(true);
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  const handleTextChange = handlerInputChangeCreator(formik)

  const changeRut = (e) => {
    const { value } = e.target;
    let format = (formatRut(value, RutFormat.DOTS_DASH));
    formik.setValues({ ...formik.values, rut: format })
  }


  React.useEffect(() => {
    handleInit();
  }, [])

  return (
    <div
      className="c-app c-default-layout flex-row"
    >
      <CContainer fluid={true}>
        <CRow className="justify-content-center h-100">
          <CCol md="6" style={styles} className="align-items-center bg-gradient-blue">
            <div className="d-flex h-100 justify-content-center align-items-center text-center flex-column text-white p-relative">
              <h1 className="bold f-48 mt-5 mt-md-0">Actualiza tus datos</h1>
            </div>
          </CCol>

          <CCol className="p-5" md="6">
            <CRow className="justify-content-center h-100">
              <CCol md={8}>
                <UserEditNavComponent></UserEditNavComponent>
                {visible ? <SignupFormComponent formik={formik} onChange={handleTextChange} changeRut={changeRut} edit={true} /> : <div className="text-center mt-5"><CSpinner color="light" /></div>}
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default EditSingUp;
