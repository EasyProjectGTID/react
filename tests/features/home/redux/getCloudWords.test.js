import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_CLOUD_WORDS_BEGIN,
  HOME_GET_CLOUD_WORDS_SUCCESS,
  HOME_GET_CLOUD_WORDS_FAILURE,
  HOME_GET_CLOUD_WORDS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getCloudWords,
  dismissGetCloudWordsError,
  reducer,
} from '../../../../src/features/home/redux/getCloudWords';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getCloudWords', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getCloudWords succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getCloudWords())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CLOUD_WORDS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CLOUD_WORDS_SUCCESS);
      });
  });

  it('dispatches failure action when getCloudWords fails', () => {
    const store = mockStore({});

    return store.dispatch(getCloudWords({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_CLOUD_WORDS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_CLOUD_WORDS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetCloudWordsError', () => {
    const expectedAction = {
      type: HOME_GET_CLOUD_WORDS_DISMISS_ERROR,
    };
    expect(dismissGetCloudWordsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_CLOUD_WORDS_BEGIN correctly', () => {
    const prevState = { getCloudWordsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLOUD_WORDS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCloudWordsPending).toBe(true);
  });

  it('handles action type HOME_GET_CLOUD_WORDS_SUCCESS correctly', () => {
    const prevState = { getCloudWordsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLOUD_WORDS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCloudWordsPending).toBe(false);
  });

  it('handles action type HOME_GET_CLOUD_WORDS_FAILURE correctly', () => {
    const prevState = { getCloudWordsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLOUD_WORDS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCloudWordsPending).toBe(false);
    expect(state.getCloudWordsError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_CLOUD_WORDS_DISMISS_ERROR correctly', () => {
    const prevState = { getCloudWordsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_CLOUD_WORDS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getCloudWordsError).toBe(null);
  });
});

