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
            <form className="formSearch" onSubmit={this.onSubmitSearchHandler}>
                {showClearCross &&
                    <button type="button" className="formSearch__clearCross" onClick={this.onClickClearCross}>&#9587;</button>
                }

                <input ref="searchInput" type="text" className="formSearch__searchInput" onChange={this.onSearchChangedHandler} />
                <input type="submit" className="formSearch__submit" value="🔍" />
            </form>
        )
    }
};

export default SearchForm;