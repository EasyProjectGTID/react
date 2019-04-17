import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_SEARCH_ACTION_BEGIN,
  HOME_SEARCH_ACTION_SUCCESS,
  HOME_SEARCH_ACTION_FAILURE,
  HOME_SEARCH_ACTION_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  searchAction,
  dismissSearchActionError,
  reducer,
} from '../../../../src/features/home/redux/searchAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/searchAction', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when searchAction succeeds', () => {
    const store = mockStore({});

    return store.dispatch(searchAction())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_ACTION_SUCCESS);
      });
  });

  it('dispatches failure action when searchAction fails', () => {
    const store = mockStore({});

    return store.dispatch(searchAction({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_SEARCH_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_SEARCH_ACTION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSearchActionError', () => {
    const expectedAction = {
      type: HOME_SEARCH_ACTION_DISMISS_ERROR,
    };
    expect(dismissSearchActionError()).toEqual(expectedAction);
  });

  it('handles action type HOME_SEARCH_ACTION_BEGIN correctly', () => {
    const prevState = { searchActionPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_ACTION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchActionPending).toBe(true);
  });

  it('handles action type HOME_SEARCH_ACTION_SUCCESS correctly', () => {
    const prevState = { searchActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_ACTION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchActionPending).toBe(false);
  });

  it('handles action type HOME_SEARCH_ACTION_FAILURE correctly', () => {
    const prevState = { searchActionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_ACTION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchActionPending).toBe(false);
    expect(state.searchActionError).toEqual(expect.anything());
  });

  it('handles action type HOME_SEARCH_ACTION_DISMISS_ERROR correctly', () => {
    const prevState = { searchActionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_ACTION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchActionError).toBe(null);
  });
});

