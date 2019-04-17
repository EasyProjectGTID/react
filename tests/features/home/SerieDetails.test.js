import React from 'react';
import { shallow } from 'enzyme';
import { SerieDetails } from '../../../src/features/home/SerieDetails';

describe('home/SerieDetails', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SerieDetails {...props} />
    );

    expect(
      renderedComponent.find('.home-serie-details').length
    ).toBe(1);
  });
});
