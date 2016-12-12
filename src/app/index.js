import * as module from '../modules/'
import * as template from '../templates/';
import urlManager from '../managers/urlManager';

export default {

    init() {

        let path = document.location.search.substring(1);


        if(path === '' || path === null) {
            this.route('search');
        } else {
            this.route(urlManager.getParam('url'));
        }

        module.search.init();

        this.nav();

        window.onpopstate = (e) => this.route(e.state);

    },

    nav() {

        let tabs = document.querySelectorAll('li');

        for (let i = 0; i < tabs.length; i+=1) {
            tabs[i].addEventListener('click', (e) => {
                let path = e.target.dataset.path;
                this.route(path);
                urlManager.urlParam(path);

                if (path === 'search') {
                    let form = document.querySelector('#form');
                    form.reset();
                    form.search.focus();
                    form.removeSearch.style.display = 'none';
                }
            });
        }
    },

    route(state) {

        if(state === 'search') {

            this.render(template.search);

        } else if(state === 'trending') {

            this.render(template.default);
            module.trending.request();

        } else if (state === 'favourites') {

            this.render(template.default);
            module.favourites.request();

        } else if (state === 'random') {

            this.render(template.default);
            module.random.request();
        }
    },

    render(content) {
        document.querySelector('#content').innerHTML = content;
    },

};