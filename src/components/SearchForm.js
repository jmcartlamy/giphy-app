import React, { Component } from 'react';

class SearchForm extends Component {

    constructor() {
        super();

        this.onSearchChangedHandler = this.onSearchChangedHandler.bind(this);

        this.state = {
            showClearCross: false
        };
    }

    onSearchChangedHandler(e) {
        this.setState({
            showClearCross: e.currentTarget.value.length > 0
        });
    }


        this.setState({
            showClearCross: false
        });

                <input ref="searchInput" type="text" name="search" onChange={this.onSearchChangedHandler} />
                <input type="submit" value="&#128269;" />
            </form>
        )
    }
};

export default SearchForm;