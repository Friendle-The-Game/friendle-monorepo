import { combineReducers } from 'redux';
import wordleReducer from '../components/Wordle/modules/reducer';

export default combineReducers({
    wordle: wordleReducer,
});
