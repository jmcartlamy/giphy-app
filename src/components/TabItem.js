import React from 'react';
import { Link } from 'react-router';

const TabItem = (props) => {
    return(
        <li className="containerTabs__tabItem">
            <Link to={props.path} className="containerTabs__tabItem__item" activeClassName="containerTabs__tabItem__item__active">
                {props.name}
            </Link>
        </li>
    );
};
export default TabItem;