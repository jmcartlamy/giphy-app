import React, { Component } from 'react';
import TabItem from './TabItem';

const tabs = [
    {
        dataPath: 'search',
        name: 'Search'
    },
    {
        dataPath: 'trending',
        name: 'Trending'
    },
    {
        dataPath: 'favourites',
        name: 'Favourites'
    },
    {
        dataPath: 'random',
        name: 'Random'
    }
];

class Tabs extends Component {
    constructor(props) {
        super();

        this.tabs = tabs.map(tab =>
            Object.assign(
                {},
                tab,
                {
                    onClickHandler: props.onClickTabCallback.bind(null, tab.dataPath)
                }
            )
        );
    }

    render() {
        return (
            <nav className="navTabs">
                <ul className="containerTabs">
                    {this.tabs.map((tab, index) => (
                        <TabItem
                            key={`tab-${index}`}
                            dataPath={tab.dataPath}
                            name={tab.name}
                            onClickHandler={tab.onClickHandler}
                        />
                    ))}
                </ul>
            </nav>
        )
    }
};

export default Tabs;