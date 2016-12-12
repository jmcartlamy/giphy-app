export default {

    getItemLS(item) {

        if (typeof(Storage) !== 'undefined' && localStorage.getItem(item) !== null) {
            return JSON.parse(localStorage.getItem(item));
        }
        return [];
    },

    setItemLS(item, data) {

        localStorage.setItem(item, JSON.stringify(data));
    }
}