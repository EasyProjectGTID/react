import initialState from './initialState';
import { reducer as searchActionReducer } from './searchAction';
import { reducer as clickSerieDetailsReducer } from './clickSerieDetails';
import { reducer as getSimilarItemsReducer } from './getSimilarItems';
import { reducer as getRecentSerieReducer } from './getRecentSerie';
import { reducer as openModalSignOrConnectReducer } from './openModalSignOrConnect';
import { reducer as registerUserReducer } from './registerUser';
import { reducer as voteReducer } from './vote';
import { reducer as getComputeReducer } from './getCompute';
import { reducer as backToComputeReducer } from './backToCompute';
import { reducer as getAllSerieReducer } from './getAllSerie';
import { reducer as getMyUserVoteReducer } from './getMyUserVote';
import { reducer as getMyVoteComputeReducer } from './getMyVoteCompute';
import { reducer as deleteVoteReducer } from './deleteVote';
import { reducer as searchCountReducer } from './searchCount';
import { reducer as closeResultatReducer } from './closeResultat';

const reducers = [
  searchActionReducer,
  clickSerieDetailsReducer,
  getSimilarItemsReducer,
  getRecentSerieReducer,
  openModalSignOrConnectReducer,
  registerUserReducer,
  voteReducer,
  getComputeReducer,
  backToComputeReducer,
  getAllSerieReducer,
  getMyUserVoteReducer,
  getMyVoteComputeReducer,
  deleteVoteReducer,
  searchCountReducer,
  closeResultatReducer,
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
