import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_UPLOAD_SERIE_BEGIN,
  HOME_UPLOAD_SERIE_SUCCESS,
  HOME_UPLOAD_SERIE_FAILURE,
  HOME_UPLOAD_SERIE_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  uploadSerie,
  dismissUploadSerieError,
  reducer,
} from '../../../../src/features/home/redux/uploadSerie';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/uploadSerie', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when uploadSerie succeeds', () => {
    const store = mockStore({});

    return store.dispatch(uploadSerie())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_UPLOAD_SERIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_UPLOAD_SERIE_SUCCESS);
      });
  });

  it('dispatches failure action when uploadSerie fails', () => {
    const store = mockStore({});

    return store.dispatch(uploadSerie({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_UPLOAD_SERIE_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_UPLOAD_SERIE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUploadSerieError', () => {
    const expectedAction = {
      type: HOME_UPLOAD_SERIE_DISMISS_ERROR,
    };
    expect(dismissUploadSerieError()).toEqual(expectedAction);
  });

  it('handles action type HOME_UPLOAD_SERIE_BEGIN correctly', () => {
    const prevState = { uploadSeriePending: false };
    const state = reducer(
      prevState,
      { type: HOME_UPLOAD_SERIE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadSeriePending).toBe(true);
  });

  it('handles action type HOME_UPLOAD_SERIE_SUCCESS correctly', () => {
    const prevState = { uploadSeriePending: true };
    const state = reducer(
      prevState,
      { type: HOME_UPLOAD_SERIE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadSeriePending).toBe(false);
  });

  it('handles action type HOME_UPLOAD_SERIE_FAILURE correctly', () => {
    const prevState = { uploadSeriePending: true };
    const state = reducer(
      prevState,
      { type: HOME_UPLOAD_SERIE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadSeriePending).toBe(false);
    expect(state.uploadSerieError).toEqual(expect.anything());
  });

  it('handles action type HOME_UPLOAD_SERIE_DISMISS_ERROR correctly', () => {
    const prevState = { uploadSerieError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_UPLOAD_SERIE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadSerieError).toBe(null);
  });
});

