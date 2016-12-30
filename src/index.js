import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';

import App from './containers/App';
import Search from './components/Search';
import Trending from './components/Trending';
import Favourites from './components/Favourites';
import Random from './components/Random';

import './index.scss';

const store = configureStore();

const history = location.hostname.indexOf('github.io') !== -1 ? hashHistory : browserHistory;

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
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

