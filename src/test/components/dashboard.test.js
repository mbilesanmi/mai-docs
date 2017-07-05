import React from 'react';
import sinon, { spy } from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { Dashboard } from '../../components/home/Dashboard.jsx';

let wrapper;
let props;

/**
 * @desc handles the triggering of the necessary action
 * @param {*} isAuthenticated
 * @param {*} user
 * @param {*} documents
 * @returns {null} returns no value
 */
function setup(isAuthenticated, user, documents) {
  props = {
    user,
    documents,
    isAuthenticated,
    userActions: { getOneUser: spy(() => new Promise((resolve) => { resolve(); })) },
    documentActions: {
      deleteDocuments: spy(() => new Promise((resolve, reject) => { resolve(); })),
      getUserDocuments: spy(() => new Promise((resolve) => { resolve(); })),
      searchUserDocuments: spy(() => new Promise((resolve, reject) => { resolve(); }))
    },
    authUser: { id: 1, roleId: 1, expiresIn: '1hr', iat: 1498921548 },
    message: ''
  };

  return mount(<Dashboard {...props} />);
}

/**
 * @desc handles the triggering of the necessary action
 * @param {*} isAuthenticated
 * @param {*} user
 * @param {*} documents
 * @returns {null} returns no value
 */
function shallowSetup(isAuthenticated, user, documents) {
  props = {
    user,
    documents,
    isAuthenticated,
    userActions: { getOneUser: spy(() => new Promise((resolve) => { resolve(); })) },
    documentActions: {
      deleteDocuments: spy(() => new Promise((resolve, reject) => { resolve(); })),
      getUserDocuments: spy(() => new Promise((resolve) => { resolve(); })),
      searchUserDocuments: spy(() => new Promise((resolve, reject) => { resolve(); }))
    },
    authUser: { id: 1, roleId: 1, expiresIn: '1hr', iat: 1498921548 },
    message: ''
  };

  const context = { router: [] };

  return shallow(<Dashboard {...props} />, { context });
}

describe('The Dashboard', () => {
  describe('component <Dashboard />', () => {
    let component;
    let userDetails;
    let documentDetails;
    let pagination;
    const documents = {
      documents: [
        { title: 'doc1', id: 1, content: 'content', User: { firstname: 'mai' } },
        { title: 'doc2', id: 2, content: 'content' },
        { title: 'doc3', id: 3, content: 'content' },
        { title: 'doc4', id: 4, content: 'content' }
      ],
      metaData: {
        'totalCount': 4,
        'pages': 2,
        'currentPage': 1,
        'pageSize': 2
       }
    };
    const noDocuments = [];
    const user = { id: 1, firstname: 'mai', lastname: 'mai', username: 'mai', email: 'mai@mai.com', Role: { title: 'Admin' } }

    it('should exist', () => {
      wrapper = setup(true);
      expect(wrapper).toExist();
    });

    it('should exist', () => {
      wrapper = shallowSetup(false, null, noDocuments);
      expect(wrapper).toExist();
    });

    it('should exist', () => {
      wrapper = setup(true, user, noDocuments);
      expect(wrapper).toExist();
    });

    it('should have a clearSearch function', () => {
      wrapper = setup(true, user, documents);
      expect(wrapper.node.clearSearch).toBeA('function');
    });

    it('should have a searchDocuments function', () => {
      wrapper = setup(true, user, documents);
      expect(wrapper.node.searchDocuments).toBeA('function');
    });

    it('should have a searchDocuments function', () => {
      wrapper = setup(true, user, documents);
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

      expect(wrapper.props().documents.metaData.pageSize).toBe(2);
      wrapper.instance().handlePageClick({ selected: 1 });
      expect(wrapper.state().offset).toBe(2);
      expect(wrapper.state().offset).toBe(wrapper.props().documents.metaData.pageSize);
      expect(wrapper.props().documentActions.getUserDocuments.called).toBe(true);
    });


    it('should handle pagination search action', () => {
      props.documents.search = 'doc';
      wrapper = mount(<Dashboard {...props} />);
      wrapper.setState({ search: 'hello world', isLoading: false });
      wrapper.instance().handlePageClick({ selected: 1 });
      expect(wrapper.props().documentActions.searchUserDocuments.called).toBe(true);
    });
  });
});
