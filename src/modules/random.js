import axios from 'axios';

import gifManager from '../managers/gifManager';

import API_KEY from '../constants/api';

export default {

    request() {

        axios.get('http://api.giphy.com/v1/gifs/random', {
            params: {
                api_key: API_KEY
            }
        })
            .then(function (response) {
                gifManager.processToRandom(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

};
