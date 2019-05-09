import React from 'react';
import { shallow } from 'enzyme';
import { Resultat } from '../../../src/features/home/Resultat';

describe('home/Resultat', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Resultat {...props} />
    );

    expect(
      renderedComponent.find('.home-resultat').length
    ).toBe(1);
  });
});
