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
        this.onClickTabHandler = this.onClickTabHandler.bind(this);

        const favs = (typeof(Storage) !== 'undefined' && localStorage.getItem('favourites') !== null) ?
            JSON.parse(localStorage.getItem('favourites')) :
            [];

        this.state = {
            path: 'search',
            isRequesting: false,
            isLoading: false,
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
            path: 'search',
            isRequesting: true,
            isLoading: true,
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
                    isLoading: false,
                    gifsData: response.data.data,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClickClearCross() {
        this.setState({
            isRequesting: false,
            isLoading: false,
            gifsData: [],
        });
    }

    onTabTrending() {
        
        this.setState({
            isRequesting: true,
            isLoading: true,
            gifsData: []
        });

        axios.get('http://api.giphy.com/v1/gifs/trending', {
            params: {
                api_key: "dc6zaTOxFJmzC",
                limit: 10
            }
        })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    gifsData: response.data.data,
                })
            })
            .catch(function (error) {
                console.log(error);
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

    onClickTabHandler(dataPath) {

        if (dataPath === 'search') {
            this.onClickClearCross();

        } else if (dataPath === 'trending')  {
            this.onTabTrending();

        } else if(dataPath === 'favourites') {
            //
        } else {
            //
        }

        this.setState({
            path: dataPath
        });
    }

    render() {

        const { isRequesting, isLoading, gifsData } = this.state;
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
                    <Tabs onClickTabCallback={this.onClickTabHandler} />
                </header>

                <div className="wrapper">
                    <div className={resultsCSSClassnames}>
                        {!isRequesting && <img className="search-watermark" src="../assets/magnifier-512.png" />}
                        {isLoading && <p>Chargement en cours...</p>}
                        {!gifsData.length && isRequesting && !isLoading && <p>Aucun résultats</p>}
                        {this.renderGifsElement(gifsData)}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
