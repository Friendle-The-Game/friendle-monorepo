import { RootState } from '../../../store';

export const selectIsConfirmed = (state: RootState) => state.confirmRegistration.isConfirmed;
