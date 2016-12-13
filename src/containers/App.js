import React, { Component } from 'react';
import React, {Component} from 'react';
import axios from 'axios';
import SearchForm from '../components/SearchForm';
import Tabs from '../components/Tabs';

class App extends Component {

  render() {
    constructor() {
        super();

        this.onSearchChangedHandler = this.onSearchChangedHandler.bind(this);

        this.state = {
            loading: false,
            gifElements: []
        }
    }

    onSearchChangedHandler(search) {

        this.setState({
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
                return <div><div><span>&#9734;</span></div><img src={gifData.images.fixed_width.webp} key={`gif-${index}`} /></div>
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

    render() {

        const { search, loading, gifElements } = this.state;

        return (
            <div className="giphy">
                <header>
                    <SearchForm onSearchChangedCallback={this.onSearchChangedHandler} />
                    <Tabs />
                </header>

                <div className="wrapper">
                        {loading && <p>Chargement en cours...</p>}
                        {gifElements}
                </div>
            </div>
        );
    }
}

export default App;
