import React, { Component } from 'react';
import axios, { CancelToken } from 'axios';
import cs from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Gif from './Gif';

import * as resultsActions from '../actions/resultsActions';


class Results extends Component {

    constructor(props) {

        super(props);

        this.onSubmitSearchHandler = this.onSubmitSearchHandler.bind(this);
        this.onClickFavGif = this.onClickFavGif.bind(this);
        this.onClickTabHandler = this.onClickTabHandler.bind(this);
        this.fetchOnAPIGiphy = this.fetchOnAPIGiphy.bind(this);
        this.clearForm = this.clearForm.bind(this);

        const typeRequest = props.type;
        const favs = (typeof(Storage) !== 'undefined' && localStorage.getItem('favourites') !== null) ?
            JSON.parse(localStorage.getItem('favourites')) :
            [];

        this.state = {
            path: typeRequest,
            isRequesting: false,
            isLoading: false,
            showLoadingMessage: false,
            listFavGifIDs: favs
        };
    }

    componentDidMount() {
        this.onClickTabHandler(this.state.path);
    }

    componentWillUnmount() {
        if (this.source) {
          this.source.cancel();
        }

        clearTimeout(this.loadingTimeOut);
    }

    componentWillReceiveProps(nextProps) {
        const previousQuery = this.props.location.query;
        const nextQuery = nextProps.location.query;

        if (previousQuery.q && !nextQuery.q) {
            this.clearForm();
        } else if (
            (!previousQuery && nextQuery)
            || (previousQuery.q !== nextQuery.q)
        ) {
            this.onSubmitSearchHandler(nextQuery.q);
        }

        if (this.props.type === 'random' && nextProps.type === 'random') {
            console.log('random reloading');
            this.onTabRandom();
        }
    }

    clearForm() {
        this.setState({ isRequesting: false });
        this.props.actions.clearGifs();
    }

    onClickTabHandler(typeRequest) {

        if (typeRequest === 'search') {
            const query = this.props.location.query;
            this.onSubmitSearchHandler(query.q);
        } else if (typeRequest === 'trending')  {
            this.onTabTrending();

        } else if(typeRequest === 'favourites') {
            this.onTabFavourites();

        } else {
            this.onTabRandom();
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

    fetchOnAPIGiphy(url, params) {

        this.source = CancelToken.source();

        this.setState({
            isLoading: true
        });

        this.loadingTimeOut = setTimeout(() => {
            if (this.state.isLoading) {
                this.setState({ showLoadingMessage: true });
            }
        }, 500);

        axios.get(url, {
            params: params,
            cancelToken: this.source.token
        })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    showLoadingMessage: false
                });
                this.props.actions.fetchSuccessGifs(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onSubmitSearchHandler(search) {
        if (search && search.length) {
            this.setState({ isRequesting: true });
            this.fetchOnAPIGiphy("http://api.giphy.com/v1/gifs/search", {
                q: search,
                api_key: "dc6zaTOxFJmzC",
                limit: 10
            });
        } else {
            this.clearForm();
        }
    }

    onTabTrending() {

        this.fetchOnAPIGiphy("http://api.giphy.com/v1/gifs/trending", {
            api_key: "dc6zaTOxFJmzC",
            limit: 10
        });
    }

    onTabFavourites() {

        this.fetchOnAPIGiphy("http://api.giphy.com/v1/gifs", {
            api_key: "dc6zaTOxFJmzC",
            ids: this.state.listFavGifIDs.toString()
        });
    }

    onTabRandom() {

        this.fetchOnAPIGiphy("http://api.giphy.com/v1/gifs/random", {
            api_key: "dc6zaTOxFJmzC"
        });
    }

    renderGifsElement(gifsData) {
        return gifsData.map(gifData => (
            <Gif
                key={gifData.id}
                gifId={gifData.id}
                gifSrc={gifData.image_url}
                gifFav={this.state.listFavGifIDs.indexOf(gifData.id) > -1}
                onClickFavGifCallback={this.onClickFavGif}
            />
        ));
    }

    renderResults() {
        const { isRequesting, isLoading, showLoadingMessage } = this.state;
        const { gifsData, type: typeRequest } = this.props;

        if (typeRequest === 'search' && !isRequesting) {

            return <img className="results__noSearchWatermark" src="../assets/magnifier-512.png" />;

        } if (showLoadingMessage) {

            return <p className="results__loading">Chargement en cours...</p>;

        } else if (!gifsData.length && isRequesting && !isLoading) {

            return <p className="results__nothing">Aucun résultats</p>;

        } else {
            return this.renderGifsElement(gifsData);
        }
    }

    render() {

        const { path, isRequesting, isLoading, showLoadingMessage } = this.state;
        const { gifsData } = this.props;

        console.log(this.props);
        const resultsCSSClassnames = cs(
            'results',
            {
                'results-column': gifsData.length > 1
            }
        );


        return (
            <div className={resultsCSSClassnames}>
                {path === 'search' && !isRequesting && <img className="results__noSearchWatermark" src="../assets/magnifier-512.png" />}
                {showLoadingMessage && <p className="results__loading">Chargement en cours...</p>}
                {path !== 'random' && !gifsData.length && isRequesting && !isLoading && <p className="results__nothing">Aucun résultats</p>}
                {path !== 'random' && this.renderGifsElement(gifsData)}
                {path === 'random' && this.renderGifElementRandom(gifsData)}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
       gifsData: state.gifsDataReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(resultsActions, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Results);