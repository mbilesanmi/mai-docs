import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mount } from 'enzyme';
import Footer from '../../components/common/Footer.jsx';


chai.use(chaiEnzyme());

describe('Footer component', () => {
  const wrapper = mount(<Footer />);
  it('it renders without crashing', () => {
    expect(wrapper).to.be.present();
  });

  it('it should contain the right with text "DocumentIt"', () => {
    expect(wrapper.find('.center')).to.contain.text('Maranatha');
  });
});
