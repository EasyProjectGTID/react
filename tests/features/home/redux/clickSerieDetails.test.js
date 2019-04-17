import {
  HOME_CLICK_SERIE_DETAILS,
} from '../../../../src/features/home/redux/constants';

import {
  clickSerieDetails,
  reducer,
} from '../../../../src/features/home/redux/clickSerieDetails';

describe('home/redux/clickSerieDetails', () => {
  it('returns correct action by clickSerieDetails', () => {
    expect(clickSerieDetails()).toHaveProperty('type', HOME_CLICK_SERIE_DETAILS);
  });

  it('handles action type HOME_CLICK_SERIE_DETAILS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CLICK_SERIE_DETAILS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
