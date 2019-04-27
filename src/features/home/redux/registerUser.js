// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_REGISTER_USER,
} from './constants';

export function registerUser(user) {
  return {
    type: HOME_REGISTER_USER,
    payload: user,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_REGISTER_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
  
      };

    default:
      return state;
  }
}

