import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import DocumentForm from '../../components/document/DocumentForm.jsx';

let wrapper;
let props;

/**
 * @desc handles the triggering of the necessary action
 * @param {*} isAuthenticated
 * @param {*} user
 * @param {*} documents
 * @returns {null} returns no value
 */
function setup(document, saving) {
  props = {
    document,
    roleId: 2,
    onSave: () => {},
    onChange: () => {},
    onModelChange: () => {},
    saving
  };

  return shallow(<DocumentForm {...props} />);
}

describe('DocumentForm component', () => {
  const document =  {
    id: 1,
    title: 'document',
    content: 'fdilunsdhfbhd',
    access: -1
  }
  const noDocument = {
    title: '',
    content: '',
    access: ''
  }

  it('it renders without crashing', () => {
    wrapper = setup(noDocument, false);
    expect(wrapper).toExist();
  });

  it('it renders without crashing', () => {
    wrapper = setup(document, true);
    expect(wrapper).toExist();
  });
});
