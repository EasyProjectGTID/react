import React from 'react';
import { shallow } from 'enzyme';
import { Vote } from '../../../src/features/home/Vote';

describe('home/Vote', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Vote {...props} />
    );

    expect(
      renderedComponent.find('.home-vote').length
    ).toBe(1);
  });
});
