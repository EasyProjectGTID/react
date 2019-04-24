import React from 'react';
import { shallow } from 'enzyme';
import { ModalComponent } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ModalComponent />);
  expect(renderedComponent.find('.home-modal-component').length).toBe(1);
});
