import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      id={props.attributeId}
      className={`${classes.button} ${props.className}`}
      type={props.type || "button"}
      onClick={props.onClick}
    >
	  {`${props.labelName} [x]`}
      {props.children}
    </button>
  );
};

export default Button;
