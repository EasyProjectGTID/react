import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_COMPUTE_BEGIN,
  HOME_GET_COMPUTE_SUCCESS,
  HOME_GET_COMPUTE_FAILURE,
  HOME_GET_COMPUTE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getCompute,
  dismissGetComputeError,
  reducer,
} from '../../../../src/features/home/redux/getCompute';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getCompute', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCompute succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getCompute())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_COMPUTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_COMPUTE_SUCCESS);
      });
  });

  it('dispatches failure action when getCompute fails', () => {
    const store = mockStore({});

    return store.dispatch(getCompute({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_COMPUTE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_COMPUTE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetComputeError', () => {
    const expectedAction = {
      type: HOME_GET_COMPUTE_DISMISS_ERROR,
    };
    expect(dismissGetComputeError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_COMPUTE_BEGIN correctly', () => {
    const prevState = { getComputePending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_COMPUTE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getComputePending).toBe(true);
  });

  it('handles action type HOME_GET_COMPUTE_SUCCESS correctly', () => {
    const prevState = { getComputePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_COMPUTE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getComputePending).toBe(false);
  });

  it('handles action type HOME_GET_COMPUTE_FAILURE correctly', () => {
    const prevState = { getComputePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_COMPUTE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getComputePending).toBe(false);
    expect(state.getComputeError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_COMPUTE_DISMISS_ERROR correctly', () => {
    const prevState = { getComputeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_COMPUTE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getComputeError).toBe(null);
  });
});

