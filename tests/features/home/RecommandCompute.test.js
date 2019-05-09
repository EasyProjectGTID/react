import React from 'react';
import { shallow } from 'enzyme';
import { RecommandCompute } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RecommandCompute />);
  expect(renderedComponent.find('.home-recommand-compute').length).toBe(1);
});
