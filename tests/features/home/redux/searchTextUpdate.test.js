import {
  HOME_SEARCH_TEXT_UPDATE,
} from '../../../../src/features/home/redux/constants';

import {
  searchTextUpdate,
  reducer,
} from '../../../../src/features/home/redux/searchTextUpdate';

describe('home/redux/searchTextUpdate', () => {
  it('returns correct action by searchTextUpdate', () => {
    expect(searchTextUpdate()).toHaveProperty('type', HOME_SEARCH_TEXT_UPDATE);
  });

  it('handles action type HOME_SEARCH_TEXT_UPDATE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_TEXT_UPDATE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
