import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_SIMILAR_ITEMS_BEGIN,
  HOME_GET_SIMILAR_ITEMS_SUCCESS,
  HOME_GET_SIMILAR_ITEMS_FAILURE,
  HOME_GET_SIMILAR_ITEMS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getSimilarItems,
  dismissGetSimilarItemsError,
  reducer,
} from '../../../../src/features/home/redux/getSimilarItems';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getSimilarItems', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getSimilarItems succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getSimilarItems())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_SIMILAR_ITEMS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_SIMILAR_ITEMS_SUCCESS);
      });
  });

  it('dispatches failure action when getSimilarItems fails', () => {
    const store = mockStore({});

    return store.dispatch(getSimilarItems({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_SIMILAR_ITEMS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_SIMILAR_ITEMS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetSimilarItemsError', () => {
    const expectedAction = {
      type: HOME_GET_SIMILAR_ITEMS_DISMISS_ERROR,
    };
    expect(dismissGetSimilarItemsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_SIMILAR_ITEMS_BEGIN correctly', () => {
    const prevState = { getSimilarItemsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_SIMILAR_ITEMS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getSimilarItemsPending).toBe(true);
  });

  it('handles action type HOME_GET_SIMILAR_ITEMS_SUCCESS correctly', () => {
    const prevState = { getSimilarItemsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_SIMILAR_ITEMS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getSimilarItemsPending).toBe(false);
  });

  it('handles action type HOME_GET_SIMILAR_ITEMS_FAILURE correctly', () => {
    const prevState = { getSimilarItemsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_SIMILAR_ITEMS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getSimilarItemsPending).toBe(false);
    expect(state.getSimilarItemsError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_SIMILAR_ITEMS_DISMISS_ERROR correctly', () => {
    const prevState = { getSimilarItemsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_SIMILAR_ITEMS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getSimilarItemsError).toBe(null);
  });
});

