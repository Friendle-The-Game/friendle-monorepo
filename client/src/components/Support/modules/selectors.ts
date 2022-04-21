import { RootState } from '../../../store';

export const selectErrors = (state: RootState) => state.support.errors;
