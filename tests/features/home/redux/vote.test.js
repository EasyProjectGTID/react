import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_VOTE_BEGIN,
  HOME_VOTE_SUCCESS,
  HOME_VOTE_FAILURE,
  HOME_VOTE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  vote,
  dismissVoteError,
  reducer,
} from '../../../../src/features/home/redux/vote';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/vote', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when vote succeeds', () => {
    const store = mockStore({});

    return store.dispatch(vote())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_VOTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_VOTE_SUCCESS);
      });
  });

  it('dispatches failure action when vote fails', () => {
    const store = mockStore({});

    return store.dispatch(vote({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_VOTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_VOTE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissVoteError', () => {
    const expectedAction = {
      type: HOME_VOTE_DISMISS_ERROR,
    };
    expect(dismissVoteError()).toEqual(expectedAction);
  });

  it('handles action type HOME_VOTE_BEGIN correctly', () => {
    const prevState = { votePending: false };
    const state = reducer(
      prevState,
      { type: HOME_VOTE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.votePending).toBe(true);
  });

  it('handles action type HOME_VOTE_SUCCESS correctly', () => {
    const prevState = { votePending: true };
    const state = reducer(
      prevState,
      { type: HOME_VOTE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.votePending).toBe(false);
  });

  it('handles action type HOME_VOTE_FAILURE correctly', () => {
    const prevState = { votePending: true };
    const state = reducer(
      prevState,
      { type: HOME_VOTE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.votePending).toBe(false);
    expect(state.voteError).toEqual(expect.anything());
  });

  it('handles action type HOME_VOTE_DISMISS_ERROR correctly', () => {
    const prevState = { voteError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_VOTE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.voteError).toBe(null);
  });
});

