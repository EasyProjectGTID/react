import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SEARCH_COUNT_BEGIN,
  HOME_SEARCH_COUNT_SUCCESS,
  HOME_SEARCH_COUNT_FAILURE,
  HOME_SEARCH_COUNT_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  searchCount,
  dismissSearchCountError,
  reducer,
} from '../../../../src/features/home/redux/searchCount';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/searchCount', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when searchCount succeeds', () => {
    const store = mockStore({});

    return store.dispatch(searchCount())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_COUNT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_COUNT_SUCCESS);
      });
  });

  it('dispatches failure action when searchCount fails', () => {
    const store = mockStore({});

    return store.dispatch(searchCount({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_COUNT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_COUNT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSearchCountError', () => {
    const expectedAction = {
      type: HOME_SEARCH_COUNT_DISMISS_ERROR,
    };
    expect(dismissSearchCountError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SEARCH_COUNT_BEGIN correctly', () => {
    const prevState = { searchCountPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_COUNT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchCountPending).toBe(true);
  });

  it('handles action type HOME_SEARCH_COUNT_SUCCESS correctly', () => {
    const prevState = { searchCountPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_COUNT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchCountPending).toBe(false);
  });

  it('handles action type HOME_SEARCH_COUNT_FAILURE correctly', () => {
    const prevState = { searchCountPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_COUNT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchCountPending).toBe(false);
    expect(state.searchCountError).toEqual(expect.anything());
  });

  it('handles action type HOME_SEARCH_COUNT_DISMISS_ERROR correctly', () => {
    const prevState = { searchCountError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_COUNT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchCountError).toBe(null);
  });
});

