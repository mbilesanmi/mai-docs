import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Footer from '../../components/common/Footer.jsx';

describe('Footer component', () => {
  const wrapper = mount(<Footer />);
  it('it renders without crashing', () => {
    expect(wrapper).toExist();
  });
});
