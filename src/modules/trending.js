import axios from 'axios';

import gifManager from '../managers/gifManager';

import API_KEY from '../constants/api';
import { LIMIT_NUMBER_GIFS_TRENDING } from '../constants/gifs';

export default {

    /*init() {
        this.request();
        document.querySelector('#form').addEventListener('submit', this.submit.bind(this));
    },

    submit(e) {
        e.preventDefault();

        let limit = e.target.limit.value;

        this.request(limit);
    },*/

    request(limit = LIMIT_NUMBER_GIFS_TRENDING) {

        axios.get('http://api.giphy.com/v1/gifs/trending', {
            params: {
                api_key: API_KEY,
                limit: limit
            }
        })
            .then(function (response) {
                gifManager.process(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
};
