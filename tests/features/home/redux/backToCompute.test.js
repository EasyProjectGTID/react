import {
  HOME_BACK_TO_COMPUTE,
} from '../../../../src/features/home/redux/constants';

import {
  backToCompute,
  reducer,
} from '../../../../src/features/home/redux/backToCompute';

describe('home/redux/backToCompute', () => {
  it('returns correct action by backToCompute', () => {
    expect(backToCompute()).toHaveProperty('type', HOME_BACK_TO_COMPUTE);
  });

  it('handles action type HOME_BACK_TO_COMPUTE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_BACK_TO_COMPUTE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
