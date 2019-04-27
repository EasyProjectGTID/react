import initialState from './initialState';
import { reducer as searchActionReducer } from './searchAction';
import { reducer as clickSerieDetailsReducer } from './clickSerieDetails';
import { reducer as getSimilarItemsReducer } from './getSimilarItems';
import { reducer as getRecentSerieReducer } from './getRecentSerie';
import { reducer as openModalSignOrConnectReducer } from './openModalSignOrConnect';
import { reducer as registerUserReducer } from './registerUser';
import { reducer as voteReducer } from './vote';

const reducers = [
  searchActionReducer,
  clickSerieDetailsReducer,
  getSimilarItemsReducer,
  getRecentSerieReducer,
  openModalSignOrConnectReducer,
  registerUserReducer,
  voteReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
