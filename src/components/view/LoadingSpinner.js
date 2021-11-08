import React from "react";

import classes from './LoadingSpinner.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <div className={classes.loader}>
      <Spinner animation="border" role="status">
        <span className="sr-only"></span>
      </Spinner>
    </div>
    
  );
};

export default LoadingSpinner;
