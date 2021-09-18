import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CButton,
  CInputGroup,
  CInput,
  CInputGroupAppend,
  CInputGroupText,
  CPagination,
} from "@coreui/react";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import Spinner from "../../app/common/Spinner";
const Table = (props) => {
  const [items, setItems] = useState(props.data);

  useEffect(() => {
    setItems(props.data);
  }, [props.data]);

  return (
    <CCard>
      <CCardHeader className="h-card">{props.title}</CCardHeader>

      <CCardBody>
        <div className={"m-2 d-sm-flex"}>
          <div className="col-lg-4 col-md-6 col-sm-12 my-2">
            {props.btnSearch === true ? (
              <CInputGroup className="input-group-search">
                <CInput
                  id="search"
                  placeholder="Buscar"
                  onChange={props.onHandleSearch}
                />
                <CInputGroupAppend onClick={props.onSearcher}>
                  <CInputGroupText className={"bg-search text-white"}>
                    <CIcon
                      name="cil-zoom"
                      className="c-d-dark-none m-1"
                      alt="CoreUI Icons Moon"
                    />
                  </CInputGroupText>
                </CInputGroupAppend>
              </CInputGroup>
            ) : (
              ""
            )}
          </div>
          {props.btnNew === true ? (
            <div className="col-md-6 col-sm-12 offset-lg-1 my-2">
              {props.check === 1 ? (
                <CButton
                  className="px-4 btn-add text-white float-right"
                  onClick={(e) => {
                    props.onHandleModalNew();
                  }}
                >
                  <CIcon name="cil-plus" /> Nuevo
                </CButton>
              ) : (
                <Link
                  to={`/${props.links.new}/${props.idClient}`}
                  className="float-right"
                >
                  <CButton className="px-4 btn-add text-white">
                    <CIcon name="cil-plus" /> Nuevo
                  </CButton>
                </Link>
              )}
            </div>
          ) : (
            ""
          )}
        </div>

        {props.btnSearch && !props.loading ? (
          <Spinner />
        ) : (
          <CDataTable
            items={items}
            fields={props.fields}
            itemsPerPage={10}
            hover
            sorter
            scopedSlots={{
              show_details: (item) => {
                return (
                  <td className="py-2">
                    {props.pdf ? (
                      <CIcon
                        onClick={(e) => {
                          props.onHandlePdf(item.Id);
                        }}
                        name="cil-file"
                        className="c-d-dark-none m-1 text-warning cursor-pointer"
                        alt="CoreUI Icons Moon"
                      />
                    ) : (
                      ""
                    )}
                    {props.check === 1 ? (
                      <CIcon
                        onClick={(e) => {
                          props.onHandleModalView(item.Id);
                        }}
                        name="cil-external-link"
                        className="c-d-dark-none m-1 text-success cursor-pointer"
                        alt="CoreUI Icons Moon"
                      />
                    ) : (
                      <Link to={`/${props.links.show}/${item.Id}`}>
                        <CIcon
                          name="cil-external-link"
                          className="c-d-dark-none m-1 text-success"
                          alt="CoreUI Icons Moon"
                        />
                      </Link>
                    )}

                    {props.check === 1 ? (
                      <CIcon
                        onClick={(e) => {
                          props.onHandleModalEdit(item.Id);
                        }}
                        name="cil-pencil"
                        className="c-d-dark-none cursor-pointer m-1 text-primary"
                        alt="CoreUI Icons Moon"
                      />
                    ) : (
                      <Link to={`/${props.links.edit}/${item.Id}`}>
                        <CIcon
                          name="cil-pencil"
                          className="c-d-dark-none m-1 text-primary"
                          alt="CoreUI Icons Moon"
                        />
                      </Link>
                    )}
                    {props.countItems > 1 ? (
                      <CIcon
                        onClick={(e) => {
                          props.onHandleModal(item.Id);
                        }}
                        name="cil-trash"
                        className="c-d-dark-none m-1 text-danger cursor-pointer"
                        alt="CoreUI Icons Moon"
                      />
                    ) : (
                      ""
                    )}
                  </td>
                );
              },
            }}
          />
        )}
        {props.pagination === true ? (
          <div className={"mt-2"}>
            <CPagination
              activePage={props.currentPage}
              pages={props.lastPage}
              align={"end"}
              onActivePageChange={(i) => props.onGetItemsCurrents(i)}
            ></CPagination>
          </div>
        ) : (
          ""
        )}
      </CCardBody>
    </CCard>
  );
};

export default Table;
