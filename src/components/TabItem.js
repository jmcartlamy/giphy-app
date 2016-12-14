import React from 'react';

const TabItem = (props) => <li data-path={props.dataPath} onClick={props.onClickHandler}>{props.name}</li>;

export default TabItem;