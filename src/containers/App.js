import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchForm from '../components/SearchForm';
import Tabs from '../components/Tabs';

import { userInput } from '../actions/searchActions';


class App extends Component {

    componentDidMount() {
        const { location: { query: { q } } } = this.props;

        if (q) {
            this.props.userInput(q);
        }

    }

    render() {

        return (
            <div className="giphy">
                <header>
                    <SearchForm />
                    <Tabs />
                </header>

                <div className="wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(null, (dispatch) => {
    return {
        userInput(input) {
            dispatch(userInput(input));
        }
    }
})(App);
