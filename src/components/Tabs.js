import React from 'react';
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

const Tabs = () => {
    return (
        <nav>
            <ul>
                {tabs.map((tab, index) => (
                    <TabItem
                        key={`tab-${index}`}
                        dataPath={tab.dataPath}
                        name={tab.name}
                    />
                ))}
            </ul>
        </nav>
    )
};

export default Tabs;