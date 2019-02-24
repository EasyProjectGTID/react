import React from 'react';
import { shallow } from 'enzyme';
import { CarrouselToVote } from '../../../src/features/home/CarrouselToVote';

describe('home/CarrouselToVote', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CarrouselToVote {...props} />
    );

    expect(
      renderedComponent.find('.home-carrousel-to-vote').length
    ).toBe(1);
  });
});
