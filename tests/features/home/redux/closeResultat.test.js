import {
  HOME_CLOSE_RESULTAT,
} from '../../../../src/features/home/redux/constants';

import {
  closeResultat,
  reducer,
} from '../../../../src/features/home/redux/closeResultat';

describe('home/redux/closeResultat', () => {
  it('returns correct action by closeResultat', () => {
    expect(closeResultat()).toHaveProperty('type', HOME_CLOSE_RESULTAT);
  });

  it('handles action type HOME_CLOSE_RESULTAT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CLOSE_RESULTAT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
