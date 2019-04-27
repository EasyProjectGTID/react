import {
  HOME_REGISTER_USER,
} from '../../../../src/features/home/redux/constants';

import {
  registerUser,
  reducer,
} from '../../../../src/features/home/redux/registerUser';

describe('home/redux/registerUser', () => {
  it('returns correct action by registerUser', () => {
    expect(registerUser()).toHaveProperty('type', HOME_REGISTER_USER);
  });

  it('handles action type HOME_REGISTER_USER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_REGISTER_USER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
