import React from 'react';
import { shallow } from 'enzyme';
import { CloudWord } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CloudWord />);
  expect(renderedComponent.find('.home-cloud-word').length).toBe(1);
});
