import React, { Component } from 'react';
import TabItem from './TabItem';

const tabs = [
    {
        path: 'search',
        name: 'Search'
    },
    {
        path: 'trending',
        name: 'Trending'
    },
    {
        path: 'favourites',
        name: 'Favourites'
    },
    {
        path: 'random',
        name: 'Random'
    }
];

class Tabs extends Component {

    constructor() {
        super();

        this.tabs = tabs;
    }

    render() {
        return (
            <nav className="navTabs">
                <ul className="containerTabs">
                    {this.tabs.map((tab, index) => (
                        <TabItem
                            key={`tab-${index}`}
                            path={tab.path}
                            name={tab.name}
                        />
                    ))}
                </ul>
            </nav>
        )
    }
};

export default Tabs;