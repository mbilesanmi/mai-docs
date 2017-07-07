import React from 'react';
import sinon, { spy } from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { AllDocuments } from '../../../components/document/AllDocuments.jsx';
import { documents2, user } from '../../testHelper.js';

let wrapper;
let props;

/**
 * @desc handles the triggering of the necessary action
 * @param {*} isAuthenticated
 * @param {*} documents
 * @param {*} user
 * @returns {null} returns no value
 */
function setup(isAuthenticated, documents, user) {
  props = {
    user,
    documents,
    isAuthenticated,
    userActions: { getOneUser: spy(() => new Promise((resolve) => { resolve(); })) },
    documentActions: {
      getAllDocuments: spy(() => new Promise((resolve) => { resolve(); })),
      searchAllDocuments: spy(() => new Promise((resolve, reject) => { resolve(); }))
    },
    authUser: { id: 1, roleId: 1, expiresIn: '1hr', iat: 1498921548 },
    message: ''
  };

  return mount(<AllDocuments {...props} />);
}

describe('AllDocuments component', () => {
  let component;
  let userDetails;
  let documentDetails;
  let pagination;
  // const user = { id: 1, firstname: 'mai', lastname: 'mai', username: 'mai', email: 'mai@mai.com', Role: { title: 'Admin' } };
  const documents = documents2;
  const noDocuments = [];

  it('should have a clearSearch function', () => {
    wrapper = setup(true, documents, user);
    expect(wrapper.node.clearSearch).toBeA('function');
  });

  it('should have a searchDocuments function', () => {
    wrapper = setup(true, documents, user);
    expect(wrapper.node.searchDocuments).toBeA('function');
  });

  it('should change state when search is done', () => {
    const input = wrapper.find('input[id="search"]');
    input.simulate('keyUp', {
      preventDefault: () => {
      },
      target: { value: 'ade' } });
    expect(wrapper.state().search).toEqual('ade');
  });

  it('should search when form is submitted', () => {
    const form = wrapper.find('form[id="search"]');
    form.simulate('submit', {
      preventDefault: () => {
      },
      target: { value: 'ade' } });
    expect(wrapper.state().isLoading).toBeTruthy();
    expect(props.documentActions.searchAllDocuments.calledOnce).toEqual(true);
  });

  it('should clear the search results', () => {
    const clear = wrapper.find('a[id="clearSearch"]');
    clear.simulate('click', {
      preventDefault: () => {
      }
    });
    expect(wrapper.state().isLoading).toBe(false);
  });

  it('should handle pagination click', () => {
    pagination = wrapper.find('.next-button');
    pagination.simulate('click', {
      preventDefault: () => {
      }
    });

    expect(wrapper.props().documents.metaData.pageSize).toBe(12);
    wrapper.instance().handlePageClick({ selected: 1 });
    expect(wrapper.state().offset).toBe(12);
    expect(wrapper.state().offset).toBe(wrapper.props().documents.metaData.pageSize);
    expect(wrapper.props().documentActions.getAllDocuments.called).toBe(true);
  });

  it('should handle pagination when searching', () => {
    props.documents.search = 'doc';
    wrapper = mount(<AllDocuments {...props} />);
    wrapper.setState({ search: 'hello world', isLoading: false });
    wrapper.instance().handlePageClick({ selected: 1 });
    expect(wrapper.props().documentActions.searchAllDocuments.called).toBe(true);
  });
});
