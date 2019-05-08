// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_BACK_TO_COMPUTE,
} from './constants';

export function backToCompute(args) {
  return {
    type: HOME_BACK_TO_COMPUTE,
    arg: args,
    
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_BACK_TO_COMPUTE:
      return {
        ...state,
        resultatCompute: action.arg
      };

    default:
      return state;
  }
}
