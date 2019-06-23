import React from 'react';
import { shallow } from 'enzyme';
import { FileItem } from '../../../src/features/home/FileItem';

describe('home/FileItem', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FileItem {...props} />
    );

    expect(
      renderedComponent.find('.home-file-item').length
    ).toBe(1);
  });
});
