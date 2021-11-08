import React from 'react';
import Button from '../view/Button.js';

const RemoveAll = (props) => {
	return <Button labelName={`Remove all`} onClick={props.onClick}></Button>
}

export default RemoveAll;