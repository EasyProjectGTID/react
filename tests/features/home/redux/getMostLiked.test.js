import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_MOST_LIKED_BEGIN,
  HOME_GET_MOST_LIKED_SUCCESS,
  HOME_GET_MOST_LIKED_FAILURE,
  HOME_GET_MOST_LIKED_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getMostLiked,
  dismissGetMostLikedError,
  reducer,
} from '../../../../src/features/home/redux/getMostLiked';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getMostLiked', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getMostLiked succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getMostLiked())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MOST_LIKED_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MOST_LIKED_SUCCESS);
      });
  });

  it('dispatches failure action when getMostLiked fails', () => {
    const store = mockStore({});

    return store.dispatch(getMostLiked({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MOST_LIKED_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MOST_LIKED_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetMostLikedError', () => {
    const expectedAction = {
      type: HOME_GET_MOST_LIKED_DISMISS_ERROR,
    };
    expect(dismissGetMostLikedError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_MOST_LIKED_BEGIN correctly', () => {
    const prevState = { getMostLikedPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_MOST_LIKED_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMostLikedPending).toBe(true);
  });

  it('handles action type HOME_GET_MOST_LIKED_SUCCESS correctly', () => {
    const prevState = { getMostLikedPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MOST_LIKED_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMostLikedPending).toBe(false);
  });

  it('handles action type HOME_GET_MOST_LIKED_FAILURE correctly', () => {
    const prevState = { getMostLikedPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MOST_LIKED_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMostLikedPending).toBe(false);
    expect(state.getMostLikedError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_MOST_LIKED_DISMISS_ERROR correctly', () => {
    const prevState = { getMostLikedError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_MOST_LIKED_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMostLikedError).toBe(null);
  });
});

