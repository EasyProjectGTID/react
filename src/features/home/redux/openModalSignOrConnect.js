// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_OPEN_MODAL_SIGN_OR_CONNECT,
} from './constants';

export function openModalSignOrConnect(args) {
  return {
    type: HOME_OPEN_MODAL_SIGN_OR_CONNECT,
    arg: args,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_OPEN_MODAL_SIGN_OR_CONNECT:
      return {
        ...state,
        modalSignOrConnect: action.arg,
      };

    default:
      return state;
  }
}
