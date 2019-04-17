import React from 'react';
import { shallow } from 'enzyme';
import { ResultatComponent } from '../../../src/features/home/ResultatComponent';

describe('home/ResultatComponent', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ResultatComponent {...props} />
    );

    expect(
      renderedComponent.find('.home-resultat-component').length
    ).toBe(1);
  });
});
