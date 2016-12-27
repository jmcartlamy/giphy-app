import React, { Component } from 'react';
import cs from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Gif from './Gif';

import * as resultsActions from '../actions/fetchActions';
import * as favouritesActions from '../actions/favouritesActions';


class Results extends Component {

    constructor(props) {

        super(props);

        this.onSubmitSearchHandler = this.onSubmitSearchHandler.bind(this);
        this.onClickFavGif = this.onClickFavGif.bind(this);
        this.onClickTabHandler = this.onClickTabHandler.bind(this);
        this.clearForm = this.clearForm.bind(this);

        this.state = {
            isRequesting: false,
            isLoading: false
        };
    }

    componentDidMount() {
        this.onClickTabHandler();
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
    }

    clearForm() {
        this.setState({ isRequesting: false });
        this.props.resultsActions.clearGifs();
    }

    onClickTabHandler() {

        const { type: typeRequest } = this.props;

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
        const currentFavs = this.props.favouritesGifs;
        const gifIsFaved = currentFavs.indexOf(idFav) > -1;

        if (!gifIsFaved) {
            this.props.favsActions.addGif(idFav);
        } else {
            this.props.favsActions.removeGif(idFav);
        }

    }

    onSubmitSearchHandler(search) {
        if (search && search.length) {
            this.setState({ isRequesting: true, isLoading: true });
            this.props.resultsActions.fetchOnApiGiphy("http://api.giphy.com/v1/gifs/search", {
                q: search,
                api_key: "dc6zaTOxFJmzC",
                limit: 10
            });
        } else {
            this.clearForm();
        }
    }

    onTabTrending() {

        this.props.resultsActions.fetchOnApiGiphy("http://api.giphy.com/v1/gifs/trending", {
            api_key: "dc6zaTOxFJmzC",
            limit: 10
        });
    }

    onTabFavourites() {

        this.props.resultsActions.fetchOnApiGiphy("http://api.giphy.com/v1/gifs", {
            api_key: "dc6zaTOxFJmzC",
            ids: this.props.favouritesGifs.toString()
        });
    }

    onTabRandom() {

        this.props.resultsActions.fetchOnApiGiphy("http://api.giphy.com/v1/gifs/random", {
            api_key: "dc6zaTOxFJmzC"
        });
    }

    renderGifsElement(gifsData) {
        return gifsData.map(gifData => (
            <Gif
                key={gifData.id}
                gifId={gifData.id}
                gifSrc={gifData.image_url}
                gifFav={this.props.favouritesGifs.indexOf(gifData.id) > -1}
                onClickFavGifCallback={this.onClickFavGif}
            />
        ));
    }

    renderResults() {
        const { isRequesting, isLoading } = this.state;
        const { gifsData, type: typeRequest } = this.props;

        if (typeRequest === 'search' && !isRequesting) {

            return <img className="results__noSearchWatermark" src="../assets/magnifier-512.png" />;

        } else if (!gifsData.length && isRequesting && !isLoading) {

            return <p className="results__nothing">Aucun résultats</p>;

        } else {
            return this.renderGifsElement(gifsData);
        }
    }

    render() {

        const { gifsData } = this.props;

        const resultsCSSClassnames = cs(
            'results',
            {
                'results-column': gifsData.length > 1
            }
        );

        return (
            <div className={resultsCSSClassnames}>
                {this.renderResults()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        gifsData: state.gifsDataReducer,
        favouritesGifs: state.gifsFavouritesReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resultsActions: bindActionCreators(resultsActions, dispatch),
        favsActions: bindActionCreators(favouritesActions, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Results);