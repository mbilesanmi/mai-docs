import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import DocumentListRow from '../../../components/document/DocumentListRow.jsx';

function setup(saving) {
  const props = {
    document: {},
    users: []
    // loggedInUser: '',
  };

  return shallow(<DocumentListRow {...props} />);
}

describe('DocumentListRow test via Enzyme', () => {
  it('renders a Link element', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('renders a select box tag', () => {
    const wrapper = setup(false);
    expect(wrapper.find('select').length).toBe(1);
  });

  it('Save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('#saveDocument').props().value).toBe('Save');
  });

  it('Save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('#saveDocument').props().value).toBe('Saving...');
  });
});
