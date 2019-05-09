import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_DELETE_VOTE_BEGIN,
  HOME_DELETE_VOTE_SUCCESS,
  HOME_DELETE_VOTE_FAILURE,
  HOME_DELETE_VOTE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  deleteVote,
  dismissDeleteVoteError,
  reducer,
} from '../../../../src/features/home/redux/deleteVote';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/deleteVote', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteVote succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteVote())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DELETE_VOTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DELETE_VOTE_SUCCESS);
      });
  });

  it('dispatches failure action when deleteVote fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteVote({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_DELETE_VOTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_DELETE_VOTE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteVoteError', () => {
    const expectedAction = {
      type: HOME_DELETE_VOTE_DISMISS_ERROR,
    };
    expect(dismissDeleteVoteError()).toEqual(expectedAction);
  });

  it('handles action type HOME_DELETE_VOTE_BEGIN correctly', () => {
    const prevState = { deleteVotePending: false };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_VOTE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteVotePending).toBe(true);
  });

  it('handles action type HOME_DELETE_VOTE_SUCCESS correctly', () => {
    const prevState = { deleteVotePending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_VOTE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteVotePending).toBe(false);
  });

  it('handles action type HOME_DELETE_VOTE_FAILURE correctly', () => {
    const prevState = { deleteVotePending: true };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_VOTE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteVotePending).toBe(false);
    expect(state.deleteVoteError).toEqual(expect.anything());
  });

  it('handles action type HOME_DELETE_VOTE_DISMISS_ERROR correctly', () => {
    const prevState = { deleteVoteError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_DELETE_VOTE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteVoteError).toBe(null);
  });
});

