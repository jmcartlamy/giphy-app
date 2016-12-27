import { createStore } from 'redux';
import rootReducer from '../reducers';
import watch from 'redux-watch';

export default () => {
    const store = createStore(
        rootReducer,
        {
            gifsFavouritesReducer: JSON.parse(localStorage.getItem('favourites')) || []
        },
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // doc devtools composeEnhancer thunk
    );

    /*
    let currentState = store.getState();
    store.subscribe(() => {
        const nextState = store.getState();
        if (nextState.gifsFavouritesReducer !== currentState.gifsFavouritesReducer) {
            localStorage.setItem('favourites', JSON.stringify(nextState.gifsFavouritesReducer))
        }
        currentState = nextState;
    });
    */

    const w = watch(store.getState, 'gifsFavouritesReducer');
    store.subscribe(w((newVal) => {
        localStorage.setItem('favourites', JSON.stringify(newVal));
    }));

    return store;
}