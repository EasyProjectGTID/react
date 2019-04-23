import initialState from './initialState';
import { reducer as searchActionReducer } from './searchAction';
import { reducer as clickSerieDetailsReducer } from './clickSerieDetails';
import { reducer as getSimilarItemsReducer } from './getSimilarItems';
import { reducer as getRecentSerieReducer } from './getRecentSerie';

const reducers = [
  searchActionReducer,
  clickSerieDetailsReducer,
  getSimilarItemsReducer,
  getRecentSerieReducer,
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
