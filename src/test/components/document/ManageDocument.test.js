import React from 'react';
import sinon, { spy } from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { ManageDocument } from '../../../components/document/ManageDocument.jsx';

let wrapper;
let props;

/**
 * @desc handles the triggering of the necessary action
 * @param {*} isAuthenticated
 * @returns {null} returns no value
 */
function setup(document, documentId) {
  props = {
    documentId,
    document,
    roleId: 1,
    documentActions: {
      createDocument: spy(() => new Promise((resolve) => { resolve(); })),
      updateDocument: spy(() => new Promise((resolve, reject) => { resolve(); })),
      getOneDocument: spy(() => new Promise((resolve, reject) => { resolve(); }))
    },
    message: ''
  };

  return shallow(<ManageDocument {...props} />);
}

describe('ManageDocument component', () => {
  let component;
  const document = {
    title: 'doc1',
    content: 'content',
    ownerId: 1,
    access: -1,
    id: 1,
    User: { firstname: 'mai', lastname: 'mai' },
    createdAt: '2017-07-06T04:57:21.797Z'
  };
  const document1 = {
    title: 'doc1',
    content: 'content',
    ownerId: 5,
    access: 0,
    id: 1,
    User: { firstname: 'mai', lastname: 'mai' },
    createdAt: '2017-07-06T04:57:21.797Z'
  };
  const noDocument = [];

  it('should display the required document', () => {
    wrapper = setup(document, 1);
    expect(wrapper).toExist();
    expect(props.documentActions.getOneDocument.called).toBe(true);
  });

  it('should display the redirected component', () => {
    wrapper = setup(noDocument);
    expect(wrapper).toExist();
  });

  it('should change state when search is done', () => {
    wrapper = setup(noDocument);
    const title = wrapper.find('input[name="title"]');
    title.simulate('change', {
      preventDefault: () => {
      },
      target: { value: 'ade', name: 'title' } });
    const content = wrapper.find('input[name="content"]');
    content.simulate('change', {
      preventDefault: () => {
      },
      target: { value: 'blah blah blah', name: 'content' } });
    const access = wrapper.find('input[name="access"]');
    access.simulate('change', {
      preventDefault: () => {
      },
      target: { value: 'role', name: 'access' } });

    expect(wrapper.state().document.title).toEqual('ade');
    expect(wrapper.state().document.content).toEqual('blah blah blah');
    expect(wrapper.state().document.access).toEqual('role');
  });
});
