import { combineReducers } from 'redux';
import wordleReducer from '../components/Wordle/modules/reducer';
import loginReducer from '../components/Login/modules/reducer';
import registerReducer from '../components/Register/modules/reducer';
import confirmRegistrationReducer from '../components/ConfirmRegistration/modules/reducer';
import supportReducer from '../components/Support/modules/reducer';

export default combineReducers({
    wordle: wordleReducer,
    login: loginReducer,
    register: registerReducer,
    confirmRegistration: confirmRegistrationReducer,
    support: supportReducer,
});
