import React, {Component} from 'react';

import SearchForm from '../components/SearchForm';
import Tabs from '../components/Tabs';

class App extends Component {

    render() {

        const { router, location } = this.props;

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

export default App;
