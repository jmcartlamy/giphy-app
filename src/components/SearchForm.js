import React, { Component } from 'react';

class SearchForm extends Component {

    constructor() {
        super();

        this.onSearchChangedHandler = this.onSearchChangedHandler.bind(this);
        this.onSubmitSearchHandler = this.onSubmitSearchHandler.bind(this);
        this.onClickClearCross = this.onClickClearCross.bind(this);

        this.state = {
            showClearCross: false
        };
    }

    onSearchChangedHandler(e) {
        this.setState({
            showClearCross: e.currentTarget.value.length > 0
        });
    }

    onSubmitSearchHandler(e) {
        e.preventDefault();

        if (this.refs.searchInput.value.length > 0) {
            this.props.onSubmitSearchCallback(this.refs.searchInput.value);
        }
    }

    onClickClearCross() {
        this.refs.searchInput.value = '';

        this.setState({
            showClearCross: false
        });

        this.props.onClickClearCrossCallback();
    }

    render() {
        const { showClearCross } = this.state;

        return (
            <form onSubmit={this.onSubmitSearchHandler}>
                {showClearCross &&
                    <button type="button" onClick={this.onClickClearCross}>&#9587;</button>
                }

                <input ref="searchInput" type="text" name="search" onChange={this.onSearchChangedHandler} />
                <input type="submit" value="🔍" />
            </form>
        )
    }
};

export default SearchForm;