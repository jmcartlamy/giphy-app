import React, {Component} from 'react';
import axios from 'axios';
import cs from 'classnames';
import Gif from '../components/Gif';

import SearchForm from '../components/SearchForm';
import Tabs from '../components/Tabs';

class App extends Component {

    constructor() {
        super();

        this.onSubmitSearchHandler = this.onSubmitSearchHandler.bind(this);
        this.onClickClearCross = this.onClickClearCross.bind(this);
        this.onClickFavGif = this.onClickFavGif.bind(this);
        this.onClickTabHandler = this.onClickTabHandler.bind(this);

        const favs = (typeof(Storage) !== 'undefined' && localStorage.getItem('favourites') !== null) ?
            JSON.parse(localStorage.getItem('favourites')) :
            [];

        this.state = {
            path: 'search',
            isRequesting: false,
            isLoading: false,
            requestString: '',
            gifsData: [],
            listFavGifIDs: favs
        }
    }

    onClickFavGif(idFav) {
        const currentFavs = this.state.listFavGifIDs;
        const gifIsFaved = currentFavs.indexOf(idFav) > -1;
        let newFavs = [];

        if (gifIsFaved) {
            newFavs = currentFavs.filter(id => id !== idFav);
        } else {
            newFavs = currentFavs.concat([idFav]);
        }

        this.setState({
            listFavGifIDs: newFavs
        });

        localStorage.setItem('favourites', JSON.stringify(newFavs));
    }

    onSubmitSearchHandler(search) {

        this.setState({
            path: 'search',
            isRequesting: true,
            isLoading: true,
            requestString: search,
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
            requestString: '',
            gifsData: []
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

    onTabFavourites() {

        this.setState({
            isRequesting: true,
            isLoading: true,
            gifsData: []
        });

        axios.get('http://api.giphy.com/v1/gifs', {
            params: {
                api_key: "dc6zaTOxFJmzC",
                ids: this.state.listFavGifIDs.toString()
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

    onTabRandom() {

        this.setState({
            isRequesting: true,
            isLoading: true,
            gifsData: []
        });

        axios.get('http://api.giphy.com/v1/gifs/random', {
            params: {
                api_key: "dc6zaTOxFJmzC"
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
                    onClickFavGifCallback={this.onClickFavGif}
                />
            );
        })
    }

    renderGifElementRandom(gifData) {
        return (
            <Gif
                key="gif-1"
                gifId={gifData.id}
                gifSrc={gifData.image_url}
                gifFav={this.state.listFavGifIDs.indexOf(gifData.id) > -1}
                onClickFavGifCallback={this.onClickFavGif}
            />
        );
    }

    onClickTabHandler(dataPath) {

        if (dataPath === 'search') {
            const requestString = this.state.requestString;
            if(requestString.length > 0) {
                this.onSubmitSearchHandler(this.state.requestString);
            } else {
                this.onClickClearCross();
            }

        } else if (dataPath === 'trending')  {
            this.onTabTrending();

        } else if(dataPath === 'favourites') {
            this.onTabFavourites();

        } else {
            this.onTabRandom();
        }

        this.setState({
            path: dataPath
        });
    }

    render() {

        const { path, isRequesting, isLoading, gifsData } = this.state;
        const resultsCSSClassnames = cs(
            'results',
            {
                'results-column': gifsData.length > 1
            }
        );

        return (
            <div className="giphy">
                <header>
                    <SearchForm onSubmitSearchCallback={this.onSubmitSearchHandler} onClickClearCrossCallback={this.onClickClearCross} />
                    <Tabs onClickTabCallback={this.onClickTabHandler} />
                </header>

                <div className="wrapper">
                    <div className={resultsCSSClassnames}>
                        {!isRequesting && <img className="results__noSearchWatermark" src="../assets/magnifier-512.png" />}
                        {isLoading && <p className="results__loading">Chargement en cours...</p>}
                        {path !== 'random' && !gifsData.length && isRequesting && !isLoading && <p className="results__nothing">Aucun résultats</p>}
                        {path !== 'random' && this.renderGifsElement(gifsData)}
                        {path === 'random' && this.renderGifElementRandom(gifsData)}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
