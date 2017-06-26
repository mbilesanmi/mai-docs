import React from 'react';//eslint-disable-line
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import NotFound from '../../components/static/NotFound.component.jsx';

describe('<NotFound />', () => {
  it('should have a heading text of h1', () => {
    const wrapper = shallow(
      <NotFound />
    );
    expect(wrapper.find('h1').length).toEqual(1);
  });
});
