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
        const value = e.currentTarget.value;
        this.setState({
            showClearCross: value.length > 0
        });
    }

    onSubmitSearchHandler(e) {
        e.preventDefault();
        const { router } = this.props;
        const searchInput = this.refs.searchInput.value;
        router.push({
            pathname: '/search',
            query: {
                q: searchInput || undefined
            }
        });
        this.refs.searchInput.value = searchInput;
    }

    onClickClearCross() {
        const { router } = this.props;
        this.refs.searchInput.value = '';
        router.push('/search');

        this.setState({
            showClearCross: false
        });
    }

    render() {
        const { showClearCross, inputValue } = this.state;
        const { initialValue } = this.props;

        return (
            <form className="formSearch" onSubmit={this.onSubmitSearchHandler}>
                {showClearCross &&
                    <button type="button" className="formSearch__clearCross" onClick={this.onClickClearCross}>&#9587;</button>
                }

                <input
                    ref="searchInput"
                    type="text"
                    className="formSearch__searchInput"
                    value={inputValue}
                    defaultValue={initialValue}
                    onChange={this.onSearchChangedHandler}
                />
                <input type="submit" className="formSearch__submit" value="🔍" />
            </form>
        )
    }
};

export default SearchForm;