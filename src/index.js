import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';

import App from './containers/App';
import Search from './components/Search';
import Trending from './components/Trending';
import Favourites from './components/Favourites';
import Random from './components/Random';

import './index.scss';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="/search" />
                <Route path="search" component={Search} />
                <Route path="trending" component={Trending} />
                <Route path="favourites" component={Favourites} />
                <Route path="random" component={Random} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));

