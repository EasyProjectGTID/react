import {
  HOME_OPEN_MODAL_SIGN_OR_CONNECT,
} from '../../../../src/features/home/redux/constants';

import {
  openModalSignOrConnect,
  reducer,
} from '../../../../src/features/home/redux/openModalSignOrConnect';

describe('home/redux/openModalSignOrConnect', () => {
  it('returns correct action by openModalSignOrConnect', () => {
    expect(openModalSignOrConnect()).toHaveProperty('type', HOME_OPEN_MODAL_SIGN_OR_CONNECT);
  });

  it('handles action type HOME_OPEN_MODAL_SIGN_OR_CONNECT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_OPEN_MODAL_SIGN_OR_CONNECT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
