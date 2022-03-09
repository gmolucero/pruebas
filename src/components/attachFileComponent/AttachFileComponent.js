import React from "react";
import { CButton, CLink, CRow, CCol, CModal } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { useLoading } from "context/hooks";
import CardComponent from "components/cardComponent/CardComponent";
import {
  deleteDependentRent,
  deleteIndependentRent,
  deleteRentAttachedFile,
  createRentFile,
  getRentAttachedFile,
} from "services/quotation";
import Modal from "components/modalComponent/ModalComponent";
import fileDownload from "js-file-download";
import Spinner from "app/common/Spinner";
import { formatClp } from "utils";
import moment from "moment";
moment.locale("es", {
  months:
    "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
      "_"
    ),
  monthsShort:
    "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split("_"),
  weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
  weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
  weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
});

const AttachFileComponent = ({ income, onDone, type }) => {
  const formated = moment(income.period).locale("es").format("MMMM YYYY");
  const [, setLoading] = useLoading();
  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const inputRef = React.useRef(null);
  const [deleteRowModal, setDeleteRowModal] = React.useState(false);
  const [attachFileModal, setAttachFileModal] = React.useState({
    id: 1,
    open: false,
    name: "",
  });

  const ERROR_MESSAGE = {
    title: "",
    text: "",
    btnText: "Cerrar",
    iconName: "cil-warning",
    iconClassName: "text-danger",
    btnOnClick: () => null,
  };

  const [modalConfig, setModalConfig] = React.useState({
    show: false,
    ...ERROR_MESSAGE,
  });

  const handleDeleteAttach = async (fileId) => {
    try {
      setLoading(true);
      const response = await deleteRentAttachedFile(fileId);
      if (response.status === 200) {
        onDone();
      } else if (response.status === 422) {
        let messageErrors = "";
        if (
          typeof response.data.errors !== "undefined" &&
          response.data.errors.length > 0
        ) {
          for (let error of response.data.errors) {
            messageErrors = `${messageErrors} ${error.join("\n")}`;
          }
        }

        setModalConfig({
          show: true,
          ...ERROR_MESSAGE,
          text: messageErrors,
          title: "¡Ha ocurrido un error!",
          btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false })),
        });
      }
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDownloadAttach = async (file) => {
    try {
      setLoading(true);
      let extension = file.original_name.split(".").pop();
      const response = await getRentAttachedFile(file.id);
      if (response.status === 200) {
        fileDownload(response.data, file.comment + "." + extension);
      } else {
        setModalConfig({
          show: true,
          ...ERROR_MESSAGE,
          title: "Advertencia",
          text: response.data.message,
          btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false })),
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setLoading(false);
  };

  const handleDeleteRegister = async () => {
    try {
      setLoading(true);
      if (type === "dependiente") {
        const response = await deleteDependentRent(income.id);
      } else {
        const response = await deleteIndependentRent(income.id);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleUploadFile = async ({ target }) => {
    try {
      setLoadingBtn(true);
      const _form = new FormData();
      _form.append("rent_id", income.id);
      _form.append("file", target.files[0]);
      const response = await createRentFile(_form);
      if (response.status === 200) {
        onDone();
      } else if (response.status === 422) {
        let messageErrors = "";
        if (
          typeof response.data.errors !== "undefined" &&
          response.data.errors.length > 0
        ) {
          for (let error of response.data.errors) {
            messageErrors = `${messageErrors} ${error.join("\n")}`;
          }
        }

        setModalConfig({
          show: true,
          ...ERROR_MESSAGE,
          text: messageErrors,
          title: "¡Ha ocurrido un error!",
          btnOnClick: () => setModalConfig((_p) => ({ ..._p, show: false })),
        });
      }
      setLoadingBtn(false);
    } catch (error) {
      console.error("Error: ", error);
      setLoadingBtn(false);
    }
  };

  return (
    <>
      <hr />
      <CRow>
        <CCol xs={10} md={6} className="align-items-center d-inline-flex bold">
          {formated} · $ {formatClp(income.income)}
        </CCol>
        <CCol xs={2} className="text-right d-md-none">
          <CIcon
            name="cil-x"
            className="pointer"
            onClick={() => setDeleteRowModal(true)}
          />
        </CCol>
        <CCol xs={12} md={5} className="py-3 py-md-0">
          <input
            type="file"
            className="d-none"
            ref={inputRef}
            onChange={handleUploadFile}
          />

          {loadingBtn ? (
            <Spinner />
          ) : (
            <CButton
              onClick={() => inputRef.current.click()}
              color="light"
              variant="outline"
              className="d-inline-flex align-items-center w-100 justify-content-center"
            >
              <CIcon name="cil-paperclip" className="mr-1" />
              Adjuntar{" "}
              <span className="d-md-none d-xl-inline pl-1"> archivos</span>
            </CButton>
          )}
        </CCol>
        <CCol className="text-right d-none d-md-inline" md={1}>
          <CIcon
            name="cil-x"
            className="pointer"
            onClick={() => setDeleteRowModal(true)}
          />
        </CCol>
      </CRow>
      <CRow>
        {income.files && income.files.length > 0 && (
          <CCol xs={12} className="text-md-left mt-2">
            <label className="bold mb-0">Archivos adjuntos</label>
          </CCol>
        )}
        {income.files &&
          income.files.map((_file) => (
            <CCol
              key={_file.id}
              xs={12}
              className="justify-content-center justify-content-md-start d-inline-flex align-items-center"
            >
              <CLink
                to="#"
                className="bold text-light d-inline-flex align-items-center"
                onClick={() => handleDownloadAttach(_file)}
              >
                <CIcon name="cil-file" className="mr-2" />
                {_file.comment}
              </CLink>
              <CIcon
                name="cil-x-circle"
                onClick={() =>
                  setAttachFileModal({
                    id: _file.id,
                    name: _file.original_name,
                    open: true,
                  })
                }
                className="m-2 text-black pointer"
              />
            </CCol>
          ))}
      </CRow>

      <CModal
        size="lg"
        show={modalConfig.show}
        onClose={() => setModalConfig((_p) => ({ ..._p, show: false }))}
        className="modal-custom"
      >
        <CardComponent {...modalConfig} />
      </CModal>

      <Modal
        show={attachFileModal.open}
        rigthButtonText="Eliminar"
        rightButtonFunc={() => handleDeleteAttach(attachFileModal.id)}
        toggle={() =>
          setAttachFileModal({
            id: 0,
            name: "",
            open: false,
          })
        }
      >
        <h3>Eliminar Archivo</h3>
        <p>¿Desea eliminar el archivo {attachFileModal.name}?</p>
      </Modal>

      <Modal
        show={deleteRowModal}
        rightButtonFunc={handleDeleteRegister}
        rigthButtonText="Eliminar"
        toggle={setDeleteRowModal}
      >
        <h3>Eliminar Periodo</h3>
        <p>¿Desea eliminar el registro {formated}?</p>
      </Modal>

      <CModal
        size="lg"
        show={modalConfig.show}
        onClose={() => setModalConfig((_p) => ({ ..._p, show: false }))}
        className="modal-custom"
      >
        <CardComponent {...modalConfig} />
      </CModal>
    </>
  );
};

AttachFileComponent.defaultProp = {
  amountField: "independent_income",
};

export default AttachFileComponent;
