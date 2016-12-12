import axios from 'axios';

import gifManager from '../managers/gifManager';
import urlManager from '../managers/urlManager';

import API_KEY from '../constants/api';
import { LIMIT_NUMBER_GIFS_SEARCH } from '../constants/gifs';

export default {

    init() {
        let q = urlManager.getParam('q'),
            form = document.querySelector('#form');

        if (q !== '') {
            let decodeQ = decodeURIComponent(q);
            this.request(decodeQ);
            form.search.value = decodeQ;
        }
        form.addEventListener('submit', this.submit.bind(this));
    },

    submit(e) {
        e.preventDefault();

        let search = encodeURIComponent(e.target.search.value),
            form = document.querySelector('#form');

        if (search !== '') {
            this.request(search);
            urlManager.setParam(['q', 'url'], [search, 'search']);
            this.InputRemoveListener(form);
        }

    },

    request(search) {

        axios.get('http://api.giphy.com/v1/gifs/search', {
            params: {
                q: search,
                api_key: API_KEY,
                limit: LIMIT_NUMBER_GIFS_SEARCH
            }
        })
        .then(function (response) {
            gifManager.process(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    },

    InputRemoveListener(form) {

        form.removeSearch.style.display = 'block';

        form.removeSearch.addEventListener('click', () => {
            urlManager.urlParam('search');

            form.reset();
            form.search.focus();

            form.removeSearch.style.display = 'none';

            let results = document.querySelector('#results');
            results.innerHTML = '<img class="search-watermark" src="../assets/magnifier-512.png" />';
            results.classList.remove("results", "results-column");

        })
    }

};