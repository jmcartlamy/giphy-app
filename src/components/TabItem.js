import React from 'react';

const TabItem = (props) => <li className="containerTabs__tabItem" data-path={props.dataPath} onClick={props.onClickHandler}>{props.name}</li>;

export default TabItem;