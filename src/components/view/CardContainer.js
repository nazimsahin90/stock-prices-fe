import React from 'react';

import classes from './CardContainer.module.css';

const CardContainer = (props) => {
  return <div id={props.id} className={`${classes.card}`}>{props.children}</div>;
};

export default CardContainer;