import { combineReducers } from 'redux';
import userInputReducer from './userInput.js';
import gifsDataReducer from './gifsData.js';

export default combineReducers({
    userInputReducer,
    gifsDataReducer
});