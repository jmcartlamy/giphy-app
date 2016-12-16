import React from 'react';
import { Link } from 'react-router';

const TabItem = (props) => {
    return(
        <li className="containerTabs__tabItem">
            <Link to={props.path}>
                {props.name}
            </Link>
        </li>
    );
};
export default TabItem;