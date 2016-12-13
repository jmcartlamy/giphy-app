import React, {Component} from 'react';
import axios from 'axios';
import cs from 'classnames';

import SearchForm from '../components/SearchForm';
import Tabs from '../components/Tabs';

class App extends Component {

    constructor() {
        super();

        this.onSearchChangedHandler = this.onSearchChangedHandler.bind(this);
        this.onClickClearCross = this.onClickClearCross.bind(this);

        this.state = {
            search: false,
            loading: false,
            gifElements: []
        }
    }

    onSearchChangedHandler(search) {

        this.setState({
            search: true,
            loading: true,
            gifElements: []
        });

        axios.get('http://api.giphy.com/v1/gifs/search', {
            params: {
                q: search,
                api_key: "dc6zaTOxFJmzC",
                limit: 10
            }
        })
        .then((response) => {
            const gifElements = response.data.data.map((gifData, index) => {
                return <div key={`gif-${index}`}><div><span>&#9734;</span></div><img src={gifData.images.fixed_width.webp} /></div>
            });

            this.setState({
                loading: false,
                gifElements
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onClickClearCross() {
        this.setState({
            search: false,
            loading: false,
            gifElements: []
        });
    }

    render() {

        const { search, loading, gifElements } = this.state;
        const resultsCSSClassnames = cs(
            'results',
            {
                'results-column': gifElements.length > 1
            }
        );

        return (
            <div className="giphy">
                <header>
                    <SearchForm onSearchChangedCallback={this.onSearchChangedHandler} onClickClearCrossCallback={this.onClickClearCross} />
                    <Tabs />
                </header>

                <div className="wrapper">
                    <div className={resultsCSSClassnames}>
                        {!search && <img src="../../assets/magnifier-512.png" />}
                        {loading && <p>Chargement en cours...</p>}
                        {!gifElements.length && search && !loading && <p>Aucun résultats</p>}
                        {gifElements}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
