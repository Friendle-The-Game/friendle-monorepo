import { AnyAction } from 'redux';
import { types } from './actions';

const initialState: { errors: Record<string, any> | null } = { errors: null };

const reducer = (state = initialState, action: AnyAction): typeof initialState => {
  switch (action.type) {
    case types.SET_REGISTER_ERRORS: {
      return { ...state, errors: action.payload.errors };
    }
    default:
      return state;
  }
};

export default reducer;
