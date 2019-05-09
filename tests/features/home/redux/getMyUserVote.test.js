import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_MY_USER_VOTE_BEGIN,
  HOME_GET_MY_USER_VOTE_SUCCESS,
  HOME_GET_MY_USER_VOTE_FAILURE,
  HOME_GET_MY_USER_VOTE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getMyUserVote,
  dismissGetMyUserVoteError,
  reducer,
} from '../../../../src/features/home/redux/getMyUserVote';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getMyUserVote', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getMyUserVote succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getMyUserVote())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MY_USER_VOTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MY_USER_VOTE_SUCCESS);
      });
  });

  it('dispatches failure action when getMyUserVote fails', () => {
    const store = mockStore({});

    return store.dispatch(getMyUserVote({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MY_USER_VOTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MY_USER_VOTE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetMyUserVoteError', () => {
    const expectedAction = {
      type: HOME_GET_MY_USER_VOTE_DISMISS_ERROR,
    };
    expect(dismissGetMyUserVoteError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_MY_USER_VOTE_BEGIN correctly', () => {
    const prevState = { getMyUserVotePending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_MY_USER_VOTE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMyUserVotePending).toBe(true);
  });

  it('handles action type HOME_GET_MY_USER_VOTE_SUCCESS correctly', () => {
    const prevState = { getMyUserVotePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MY_USER_VOTE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMyUserVotePending).toBe(false);
  });

  it('handles action type HOME_GET_MY_USER_VOTE_FAILURE correctly', () => {
    const prevState = { getMyUserVotePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MY_USER_VOTE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMyUserVotePending).toBe(false);
    expect(state.getMyUserVoteError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_MY_USER_VOTE_DISMISS_ERROR correctly', () => {
    const prevState = { getMyUserVoteError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_MY_USER_VOTE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMyUserVoteError).toBe(null);
  });
});

