import React, { Component } from 'react';
import cs from 'classnames';

class Gif extends Component {

    constructor() {
        super();

        this.onClickFavHandler = this.onClickFavHandler.bind(this);
        this.onLoadGifHandler = this.onLoadGifHandler.bind(this);

        this.state = {
            loaded: false,
            heightGif: 0
        }
    }

    onClickFavHandler() {
        this.props.onClickFavGifCallback(this.props.gifId);
    }

    onLoadGifHandler(e) {
        const clientHeight = e.target.clientHeight;

        this.setState({
            loaded: true,
            heightGif: clientHeight
        });

    }

    render() {

        const { gifSrc, gifFav } = this.props;
        const { loaded, heightGif } = this.state;

        const gifCSSClassnames = cs(
            'containerGifs__overlay__iconFav',
            {
                'containerGifs__overlay__iconFavChecked': gifFav === true
            }
        );

        return (
            <div className="containerGifs">
                {loaded &&
                    <div className="containerGifs__overlay" style={{height: heightGif + 'px'}}>
                        <span className={gifCSSClassnames} onClick={this.onClickFavHandler}>&#9734;</span>
                    </div>
                }
                <img className="containerGifs__gifItem" src={gifSrc} onLoad={this.onLoadGifHandler} />
            </div>
        )
    }
}

export default Gif;