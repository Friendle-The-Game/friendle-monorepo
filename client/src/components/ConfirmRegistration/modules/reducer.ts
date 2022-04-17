import { AnyAction } from 'redux';
import { types } from './actions';

const initialState: { isConfirmed: boolean } = { isConfirmed: false };

const reducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case types.SET_IS_CONFIRMED: {
      return { ...state, isConfirmed: action.payload.isConfirmed };
    }
    default:
      return state;
  }
};

export default reducer;
