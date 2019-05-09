import React from 'react';
import { shallow } from 'enzyme';
import { MesVotes } from '../../../src/features/home/MesVotes';

describe('home/MesVotes', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MesVotes {...props} />
    );

    expect(
      renderedComponent.find('.home-mes-votes').length
    ).toBe(1);
  });
});
