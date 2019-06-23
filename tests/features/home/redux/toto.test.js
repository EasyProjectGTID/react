import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_TOTO_BEGIN,
  HOME_TOTO_SUCCESS,
  HOME_TOTO_FAILURE,
  HOME_TOTO_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  toto,
  dismissTotoError,
  reducer,
} from '../../../../src/features/home/redux/toto';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/toto', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when toto succeeds', () => {
    const store = mockStore({});

    return store.dispatch(toto())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_TOTO_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_TOTO_SUCCESS);
      });
  });

  it('dispatches failure action when toto fails', () => {
    const store = mockStore({});

    return store.dispatch(toto({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_TOTO_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_TOTO_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTotoError', () => {
    const expectedAction = {
      type: HOME_TOTO_DISMISS_ERROR,
    };
    expect(dismissTotoError()).toEqual(expectedAction);
  });

  it('handles action type HOME_TOTO_BEGIN correctly', () => {
    const prevState = { totoPending: false };
    const state = reducer(
      prevState,
      { type: HOME_TOTO_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.totoPending).toBe(true);
  });

  it('handles action type HOME_TOTO_SUCCESS correctly', () => {
    const prevState = { totoPending: true };
    const state = reducer(
      prevState,
      { type: HOME_TOTO_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.totoPending).toBe(false);
  });

  it('handles action type HOME_TOTO_FAILURE correctly', () => {
    const prevState = { totoPending: true };
    const state = reducer(
      prevState,
      { type: HOME_TOTO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.totoPending).toBe(false);
    expect(state.totoError).toEqual(expect.anything());
  });

  it('handles action type HOME_TOTO_DISMISS_ERROR correctly', () => {
    const prevState = { totoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_TOTO_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.totoError).toBe(null);
  });
});

