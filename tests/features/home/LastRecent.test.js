import React from 'react';
import { shallow } from 'enzyme';
import { LastRecent } from '../../../src/features/home/LastRecent';

describe('home/LastRecent', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LastRecent {...props} />
    );

    expect(
      renderedComponent.find('.home-last-recent').length
    ).toBe(1);
  });
});
