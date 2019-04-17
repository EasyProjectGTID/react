import React from 'react';
import { shallow } from 'enzyme';
import { Recommandations } from '../../../src/features/home/Recommandations';

describe('home/Recommandations', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Recommandations {...props} />
    );

    expect(
      renderedComponent.find('.home-recommandations').length
    ).toBe(1);
  });
});
