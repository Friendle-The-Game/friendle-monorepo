import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import View from './View';
import { login } from './modules/actions';
import { selectErrors } from './modules/selectors';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
  errors: selectErrors(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  actions: bindActionCreators({
    login,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
