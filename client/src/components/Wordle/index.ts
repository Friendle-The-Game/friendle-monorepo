import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import View from './View';
import { selectGuesses } from './modules/selectors';
import {
  guessWordle, startWordle,
} from './modules/actions';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
  guesses: selectGuesses(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  actions: bindActionCreators({
    guessWordle,
    startWordle,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
