import React from 'react';
import { shallow } from 'enzyme';
import { ElementOfCarrousel } from '../../../src/features/home/ElementOfCarrousel';

describe('home/ElementOfCarrousel', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ElementOfCarrousel {...props} />
    );

    expect(
      renderedComponent.find('.home-element-of-carrousel').length
    ).toBe(1);
  });
});
