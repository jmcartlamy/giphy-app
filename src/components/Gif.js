import React, { Component } from 'react';
import cs from 'classnames';

class Gif extends Component {

    constructor() {
        super();

        this.onClickFavHandler = this.onClickFavHandler.bind(this);
    }

    onClickFavHandler() {
        this.props.onClickFavGifCallback(this.props.gifId);
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
                <img src={gifSrc} />
            </div>
        )
    }
}

export default Gif;