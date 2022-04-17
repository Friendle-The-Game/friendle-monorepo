import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import View from './View';
import { confirmRegistration } from './modules/actions';
import { selectIsConfirmed } from './modules/selectors';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
  isConfirmed: selectIsConfirmed(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  actions: bindActionCreators({
    confirmRegistration,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
