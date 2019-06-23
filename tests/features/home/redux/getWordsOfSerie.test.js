import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_WORDS_OF_SERIE_BEGIN,
  HOME_GET_WORDS_OF_SERIE_SUCCESS,
  HOME_GET_WORDS_OF_SERIE_FAILURE,
  HOME_GET_WORDS_OF_SERIE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getWordsOfSerie,
  dismissGetWordsOfSerieError,
  reducer,
} from '../../../../src/features/home/redux/getWordsOfSerie';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getWordsOfSerie', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getWordsOfSerie succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getWordsOfSerie())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_WORDS_OF_SERIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_WORDS_OF_SERIE_SUCCESS);
      });
  });

  it('dispatches failure action when getWordsOfSerie fails', () => {
    const store = mockStore({});

    return store.dispatch(getWordsOfSerie({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_WORDS_OF_SERIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_WORDS_OF_SERIE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetWordsOfSerieError', () => {
    const expectedAction = {
      type: HOME_GET_WORDS_OF_SERIE_DISMISS_ERROR,
    };
    expect(dismissGetWordsOfSerieError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_WORDS_OF_SERIE_BEGIN correctly', () => {
    const prevState = { getWordsOfSeriePending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_WORDS_OF_SERIE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWordsOfSeriePending).toBe(true);
  });

  it('handles action type HOME_GET_WORDS_OF_SERIE_SUCCESS correctly', () => {
    const prevState = { getWordsOfSeriePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_WORDS_OF_SERIE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWordsOfSeriePending).toBe(false);
  });

  it('handles action type HOME_GET_WORDS_OF_SERIE_FAILURE correctly', () => {
    const prevState = { getWordsOfSeriePending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_WORDS_OF_SERIE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWordsOfSeriePending).toBe(false);
    expect(state.getWordsOfSerieError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_WORDS_OF_SERIE_DISMISS_ERROR correctly', () => {
    const prevState = { getWordsOfSerieError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_WORDS_OF_SERIE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWordsOfSerieError).toBe(null);
  });
});

