import React from 'react';
import sinon, { spy } from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { ViewDocument } from '../../../components/document/ViewDocument.jsx';
import { manageDocument, manageDocument1 } from '../../testHelper';

let wrapper;
let props;

/**
 * @desc handles the triggering of the necessary action
 * @param {*} isAuthenticated
 * @returns {null} returns no value
 */
function setup(isAuthenticated, document, documentId) {
  props = {
    isAuthenticated,
    documentId,
    document,
    documentActions: {
      deleteDocument: spy(() => new Promise((resolve) => { resolve(); })),
      getOneDocument: spy(() => new Promise((resolve, reject) => { resolve(); }))
    },
    authUser: { id: 1, roleId: 1, expiresIn: '1hr', iat: 1498921548 },
    message: ''
  };

  return mount(<ViewDocument {...props} />);
}

describe('ViewDocument component', () => {
  let component;
  const document = manageDocument;
  const document1 = manageDocument1;
  const noDocument = [];

  it('should display the required document', () => {
    wrapper = setup(true, document, 1);
    expect(wrapper).toExist();
    expect(wrapper.props().documentActions.getOneDocument.called).toBe(true);
  });

  it('should display the redirected component', () => {
    wrapper = setup(false, noDocument);
    expect(wrapper).toExist();
  });

  it('should have a deleteDocument function', (done) => {
    wrapper = setup(true, document1, 1);
    expect(wrapper.node.deleteDocument).toBeA('function');
    done();
  });
});
