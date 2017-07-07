import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Footer from '../../../components/common/Footer.jsx';

describe('Footer component', () => {
  const wrapper = mount(<Footer />);
  it('should display the footer', () => {
    expect(wrapper).toExist();
  });
});
