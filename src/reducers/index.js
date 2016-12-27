import { combineReducers } from 'redux';
import userInputReducer from './userInput.js';
import gifsDataReducer from './gifsData.js';
import gifsFavouritesReducer from './gifsFavourites.js';
import gifsLoadedReducer from './gifsLoaded.js';

export default combineReducers({
    userInputReducer,
    gifsDataReducer,
    gifsFavouritesReducer,
    gifsLoadedReducer
});