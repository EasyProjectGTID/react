import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_MY_VOTE_COMPUTE_BEGIN,
  HOME_GET_MY_VOTE_COMPUTE_SUCCESS,
  HOME_GET_MY_VOTE_COMPUTE_FAILURE,
  HOME_GET_MY_VOTE_COMPUTE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getMyVoteCompute,
  dismissGetMyVoteComputeError,
  reducer,
} from '../../../../src/features/home/redux/getMyVoteCompute';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getMyVoteCompute', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getMyVoteCompute succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getMyVoteCompute())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MY_VOTE_COMPUTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MY_VOTE_COMPUTE_SUCCESS);
      });
  });

  it('dispatches failure action when getMyVoteCompute fails', () => {
    const store = mockStore({});

    return store.dispatch(getMyVoteCompute({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_MY_VOTE_COMPUTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_MY_VOTE_COMPUTE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetMyVoteComputeError', () => {
    const expectedAction = {
      type: HOME_GET_MY_VOTE_COMPUTE_DISMISS_ERROR,
    };
    expect(dismissGetMyVoteComputeError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_MY_VOTE_COMPUTE_BEGIN correctly', () => {
    const prevState = { getMyVoteComputePending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_MY_VOTE_COMPUTE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMyVoteComputePending).toBe(true);
  });

  it('handles action type HOME_GET_MY_VOTE_COMPUTE_SUCCESS correctly', () => {
    const prevState = { getMyVoteComputePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MY_VOTE_COMPUTE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMyVoteComputePending).toBe(false);
  });

  it('handles action type HOME_GET_MY_VOTE_COMPUTE_FAILURE correctly', () => {
    const prevState = { getMyVoteComputePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_MY_VOTE_COMPUTE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMyVoteComputePending).toBe(false);
    expect(state.getMyVoteComputeError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_MY_VOTE_COMPUTE_DISMISS_ERROR correctly', () => {
    const prevState = { getMyVoteComputeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_MY_VOTE_COMPUTE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getMyVoteComputeError).toBe(null);
  });
});

