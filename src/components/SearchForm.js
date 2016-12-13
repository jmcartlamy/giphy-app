import React, { Component } from 'react';

class SearchForm extends Component {

    constructor() {
        super();

        this.onSearchChangedHandler = this.onSearchChangedHandler.bind(this);
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

    onClickClearCross() {
        this.refs.searchInput.value = '';

        this.setState({
            showClearCross: false
        });
    }
        const { showClearCross } = this.state;

        return (
                {showClearCross &&
                    <button type="button" onClick={this.onClickClearCross}>&#9587;</button>
                }

                <input ref="searchInput" type="text" name="search" onChange={this.onSearchChangedHandler} />
                <input type="submit" value="&#128269;" />
            </form>
        )
    }
};

export default SearchForm;