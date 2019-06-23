import React from 'react';
import { shallow } from 'enzyme';
import { UploadSerie } from '../../../src/features/home/UploadSerie';

describe('home/UploadSerie', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UploadSerie {...props} />
    );

    expect(
      renderedComponent.find('.home-upload-serie').length
    ).toBe(1);
  });
});
