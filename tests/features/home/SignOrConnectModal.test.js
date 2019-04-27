import React from 'react';
import { shallow } from 'enzyme';
import { SignOrConnectModal } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SignOrConnectModal />);
  expect(renderedComponent.find('.home-sign-or-connect-modal').length).toBe(1);
});
