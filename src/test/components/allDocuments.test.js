import React from 'react';
import sinon, { spy } from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { AllDocuments } from '../../components/document/AllDocuments.jsx';

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
      //
      // ADD PROMISE REJECTION HERE
      //
      getAllDocuments: spy(() => new Promise((resolve) => { resolve(); })),
      searchAllDocuments: spy(() => new Promise((resolve, reject) => { resolve(); }))
    },
    authUser: { id: 1, roleId: 1, expiresIn: '1hr', iat: 1498921548 },
    message: ''
  };

  return mount(<AllDocuments {...props} />);
}

describe('The AllDocuments', () => {
  describe('component <AllDocuments />', () => {
    let component;
    let userDetails;
    let documentDetails;
    let pagination;
    const user = { id: 1, firstname: 'mai', lastname: 'mai', username: 'mai', email: 'mai@mai.com', Role: { title: 'Admin' } };
    const documents = {
      documents: [
        { title: 'doc1', content: 'content', id: 1, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc2', content: 'content', id: 2, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc3', content: 'content', id: 31, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc4', content: 'content', id: 4, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc3', content: 'content', id: 5, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc4', content: 'content', id: 6, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc3', content: 'content', id: 7, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc4', content: 'content', id: 8, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc4', content: 'content', id: 9, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc4', content: 'content', id: 10, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc4', content: 'content', id: 11, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc4', content: 'content', id: 12, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc3', content: 'content', id: 13, User: { firstname: 'mai', lastname: 'mai' } },
        { title: 'doc4', content: 'content', id: 14, User: { firstname: 'mai', lastname: 'mai' } }
      ],
      metaData: {
        'totalCount': 14,
        'pages': 2,
        'currentPage': 1,
        'pageSize': 12
       }
    };
    const noDocuments = [];

    it('should exist', () => {
      wrapper = setup(true, documents, user);
      expect(wrapper).toExist();
    });
    it('should exist', () => {
      wrapper = setup(false, noDocuments);
      expect(wrapper).toExist();
    });

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


    it('should handle pagination search action', () => {
      props.documents.search = 'doc';
      wrapper = mount(<AllDocuments {...props} />);
      wrapper.setState({ search: 'hello world', isLoading: false });
      wrapper.instance().handlePageClick({ selected: 1 });
      expect(wrapper.props().documentActions.searchAllDocuments.called).toBe(true);
    });
  });
});
