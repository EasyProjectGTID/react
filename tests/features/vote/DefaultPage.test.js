import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/vote/DefaultPage';

describe('vote/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      vote: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.vote-default-page').length
    ).toBe(1);
  });
});
