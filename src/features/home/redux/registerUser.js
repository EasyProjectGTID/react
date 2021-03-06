// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_REGISTER_USER,
} from './constants';

export function registerUser(token) {
  return {
    type: HOME_REGISTER_USER,
    payload: token,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_REGISTER_USER:
      return {
        ...state,
        token: action.payload.token,
        typeApp: action.payload.typeApp,
        baseApiUrl: action.payload.base_url
  
      };

    default:
      return state;
  }
}

