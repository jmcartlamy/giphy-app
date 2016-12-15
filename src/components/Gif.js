import React, { Component } from 'react';
import cs from 'classnames';

class Gif extends Component {

    constructor() {
        super();

        this.onClickFavHandler = this.onClickFavHandler.bind(this);
        this.onLoadGifHandler = this.onLoadGifHandler.bind(this);
    }

    onClickFavHandler() {
        this.props.onClickFavGifCallback(this.props.gifId);
    }

    onLoadGifHandler(e) {
        const clientHeight = e.target.clientHeight;

        if (clientHeight !== 0) {
            e.target.previousElementSibling.setAttribute("style", "height: " + clientHeight + "px");
        }
    }

    render() {

        const { gifSrc, gifFav } = this.props;

        const gifCSSClassnames = cs(
            {
                'checked': gifFav === true
            }
        );

        return (
            <div>
                <div>
                    <span className={gifCSSClassnames} onClick={this.onClickFavHandler}>&#9734;</span>
                </div>
                <img src={gifSrc} onLoad={this.onLoadGifHandler} />
            </div>
        )
    }
}

export default Gif;