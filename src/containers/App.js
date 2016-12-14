import React, {Component} from 'react';
import axios from 'axios';
import cs from 'classnames';
import Gif from '../components/Gif';

import SearchForm from '../components/SearchForm';
import Tabs from '../components/Tabs';

class App extends Component {

    constructor() {
        super();

        this.onSearchChangedHandler = this.onSearchChangedHandler.bind(this);
        this.onClickClearCross = this.onClickClearCross.bind(this);
        this.onFavGifClick = this.onFavGifClick.bind(this);

        const favs = (typeof(Storage) !== 'undefined' && localStorage.getItem('favourites') !== null) ?
            JSON.parse(localStorage.getItem('favourites')) :
            [];

        this.state = {
            search: false,
            loading: false,
            gifsData: [],
            listFavGifIDs: favs
        }
    }

    onFavGifClick(idFav) {
        const currentFavs = this.state.listFavGifIDs;
        const gifIsFaved = currentFavs.indexOf(idFav) > -1;
        let newFavs = [];

        if (gifIsFaved) {
            newFavs = currentFavs.filter(id => id !== idFav);
        }
        else {
            newFavs = currentFavs.concat([idFav]);
        }

        console.log(newFavs);

        this.setState({
            listFavGifIDs: newFavs
        });

        localStorage.setItem('favourites', JSON.stringify(newFavs));
    }

    onSearchChangedHandler(search) {

        this.setState({
            search: true,
            loading: true,
            gifsData: []
        });

        axios.get('http://api.giphy.com/v1/gifs/search', {
            params: {
                q: search,
                api_key: "dc6zaTOxFJmzC",
                limit: 10
            }
        })
            .then((response) => {
                this.setState({
                    loading: false,
                    gifsData: response.data.data,
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
            gifsData: [],
        });
    }

    renderGifsElement(gifsData) {
        return gifsData.map((gifData, index) => {
            return (
                <Gif
                    key={`gif-${index}`}
                    gifId={gifData.id}
                    gifSrc={gifData.images.fixed_width.webp}
                    gifFav={this.state.listFavGifIDs.indexOf(gifData.id) > -1}
                    onFavGifClickCallback={this.onFavGifClick}
                />
            );
        });
    }

    render() {

        const { search, loading, gifsData } = this.state;
        const resultsCSSClassnames = cs(
            'results',
            {
                'results-column': gifsData.length > 1
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
                        {!search && <img className="search-watermark" src="../assets/magnifier-512.png" />}
                        {loading && <p>Chargement en cours...</p>}
                        {!gifsData.length && search && !loading && <p>Aucun résultats</p>}
                        {this.renderGifsElement(gifsData)}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
