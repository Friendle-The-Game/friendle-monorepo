import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import View from './View';
import { register } from './modules/actions';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  actions: bindActionCreators({
    register,
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(View);
