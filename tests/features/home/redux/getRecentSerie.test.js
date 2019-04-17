import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_RECENT_SERIE_BEGIN,
  HOME_GET_RECENT_SERIE_SUCCESS,
  HOME_GET_RECENT_SERIE_FAILURE,
  HOME_GET_RECENT_SERIE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getRecentSerie,
  dismissGetRecentSerieError,
  reducer,
} from '../../../../src/features/home/redux/getRecentSerie';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getRecentSerie', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getRecentSerie succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getRecentSerie())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_RECENT_SERIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_RECENT_SERIE_SUCCESS);
      });
  });

  it('dispatches failure action when getRecentSerie fails', () => {
    const store = mockStore({});

    return store.dispatch(getRecentSerie({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_RECENT_SERIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_RECENT_SERIE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetRecentSerieError', () => {
    const expectedAction = {
      type: HOME_GET_RECENT_SERIE_DISMISS_ERROR,
    };
    expect(dismissGetRecentSerieError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_RECENT_SERIE_BEGIN correctly', () => {
    const prevState = { getRecentSeriePending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_RECENT_SERIE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRecentSeriePending).toBe(true);
  });

  it('handles action type HOME_GET_RECENT_SERIE_SUCCESS correctly', () => {
    const prevState = { getRecentSeriePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_RECENT_SERIE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRecentSeriePending).toBe(false);
  });

  it('handles action type HOME_GET_RECENT_SERIE_FAILURE correctly', () => {
    const prevState = { getRecentSeriePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_RECENT_SERIE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRecentSeriePending).toBe(false);
    expect(state.getRecentSerieError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_RECENT_SERIE_DISMISS_ERROR correctly', () => {
    const prevState = { getRecentSerieError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_RECENT_SERIE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getRecentSerieError).toBe(null);
  });
});

