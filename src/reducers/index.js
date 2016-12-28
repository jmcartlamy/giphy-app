import { combineReducers } from 'redux';
import userInputReducer from './userInput.js';
import gifsDataReducer from './gifs.js';
import gifsFavouritesReducer from './gifsFavourites.js';

export default combineReducers({
    userInputReducer,
    gifsDataReducer,
    gifsFavouritesReducer
});