import {
  HOME_SEARCH_ACTION_BEGIN,
  HOME_SEARCH_ACTION_SUCCESS,
  HOME_SEARCH_ACTION_FAILURE,
  HOME_SEARCH_ACTION_DISMISS_ERROR,
} from './constants';
import httpService from '../../../services/httpService';
import ip from '../../../services/config';
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function searchAction(args = {}) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_SEARCH_ACTION_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      
      const doRequest = httpService(getState().home.token).get(ip +':8000/recherche?keywords=' + args)
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_SEARCH_ACTION_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_SEARCH_ACTION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSearchActionError() {
  return {
    type: HOME_SEARCH_ACTION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SEARCH_ACTION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        resultatRecherche: [],
        showDetails: null,
        searchActionPending: true,
        searchActionError: null,
      };

    case HOME_SEARCH_ACTION_SUCCESS:
      return {
        ...state,
        resultatRecherche: action.data.data,
        searchActionPending: false,
        searchActionError: null,
      };

    case HOME_SEARCH_ACTION_FAILURE:
      // The request is failed
      return {
        ...state,
        searchActionPending: false,
        searchActionError: action.data.error,
      };

    case HOME_SEARCH_ACTION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        searchActionError: null,
      };

    default:
      return state;
  }
}
