import { CSpinner } from "@coreui/react";
import React from "react";

const Spinner = (props) => {
  const style = {
    position: props.position,
    top: "50%",
    left: "50%",
  };

  const styleSpinner = {
    display: "block",
    margin: "0 auto",
  };

  return (
    <>
      <div style={style}>
        <CSpinner style={styleSpinner} /> {props.text}
      </div>
    </>
  );
};

export default Spinner;
