import React from 'react';

import classes from './CardContainer.module.css';

const CardContainer = (props) => {
  return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default CardContainer;