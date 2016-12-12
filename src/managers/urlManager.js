export default {

    init() {
        let paramsString = document.location.search;
        let searchParams = new URLSearchParams(paramsString);

        return searchParams;
    },

    getParam(key) {

        let searchParams = this.init();
        let param = searchParams.get(key);

        return param || '';

    },

    setParam(key, value) {

        let searchParams = this.init();
        let state = this.getParam('url');

        for (let i = 0; i < key.length ; i+=1) {
            searchParams.set(key[i], value[i]);
        }

        history.pushState(state, '', '?'+searchParams.toString());
    },

    deleteParam(key) {

        let searchParams = this.init();
        let state = '';

        searchParams.delete(key);

        if (searchParams.has('url')) {
            state = searchParams.get('url');
        }

        history.replaceState(state, '', '?'+searchParams.toString());
    },

    urlParam(value, key = 'url') {

        let searchParams = this.init();

        let state = '';

        searchParams.set(key, value);

        for (let param of searchParams.keys()) {
            if ( param !== 'url' ) {
                searchParams.delete(param);
            }
        }

        if (searchParams.has('url')) {
            state = searchParams.get('url');
        }

        history.pushState(state, '', '?'+searchParams.toString());

    }

}