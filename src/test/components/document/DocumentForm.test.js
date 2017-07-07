import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import DocumentForm from '../../../components/document/DocumentForm.jsx';
import { noDocument, document } from '../../testHelper';

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
  it('should display the Add New Document form', () => {
    wrapper = setup(noDocument, false);
    expect(wrapper).toExist();
  });

  it('should display the Edit form', () => {
    wrapper = setup(document, true);
    expect(wrapper).toExist();
  });
});
