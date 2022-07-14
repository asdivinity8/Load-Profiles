import React from "react";

const style = {
  display: "block",
  position: "relative",
  top: "10px",
  left: "0",
  color: "#102D4C",
  fontSize: "16px",
  fontWeight: "bold"
};

const rotateStyles = {
  display: "block",
  textAlign: "center",
  marginBottom: "50px",
  color: "#102D4C",
  fontSize: "16px",
  fontWeight: "bold"
}

const Label = ({text, rotate}) => (
  <div>
    <span style={{...style, ...(rotate ? rotateStyles : {})}}>{text}</span>
  </div>
);

export default Label;