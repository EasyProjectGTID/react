import React from 'react';
import { shallow } from 'enzyme';
import { Upload } from '../../../src/features/home/Upload';

describe('home/Upload', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Upload {...props} />
    );

    expect(
      renderedComponent.find('.home-upload').length
    ).toBe(1);
  });
});
