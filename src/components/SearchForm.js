import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as searchActions from '../actions/inputSearchActions';


class SearchForm extends Component {

    constructor() {
        super();

        this.onSearchChangedHandler = this.onSearchChangedHandler.bind(this);
        this.onSubmitSearchHandler = this.onSubmitSearchHandler.bind(this);
        this.onClickClearCross = this.onClickClearCross.bind(this);

    }

    onClickClearCross() {
        const { router, actions } = this.props;
        router.push('/search');
        actions.clearInput();
    }

    onSearchChangedHandler(e) {
        const value = e.target.value;
        this.props.actions.userInput(value);
    }

    onSubmitSearchHandler(e) {
        e.preventDefault();

        const { router, userInput } = this.props;
         router.push({
             pathname: '/search',
             query: {
                q: userInput || undefined
             }
         });
    }

    render() {

        const { userInput } = this.props;

        return (
            <form className="formSearch" onSubmit={this.onSubmitSearchHandler}>
                {userInput.length > 0 &&
                    <button type="button" className="formSearch__clearCross" onClick={this.onClickClearCross}>&#9587;</button>
                }

                <input
                    ref="searchInput"
                    type="text"
                    className="formSearch__searchInput"
                    value={userInput}
                    onChange={this.onSearchChangedHandler}
                />
                <input type="submit" className="formSearch__submit" value="🔍" />
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInput: state.userInputReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(searchActions, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SearchForm));
