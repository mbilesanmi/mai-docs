import React from 'react';
import sinon, { spy } from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { AllDocuments } from '../../components/document/AllDocuments.jsx';

let wrapper;

/**
 * @desc handles the triggering of the necessary action
 * @param {*} isAuthenticated
 * @returns {null} returns no value
 */
function setup(isAuthenticated) {
  const props = {
    user: { id: 1, firstname: 'mai', lastname: 'mai', username: 'mai', email: 'mai@mai.com', Role: { title: 'Admin' } },
    documents: {
      document: [
        { title: 'doc1', content: 'content', User: { firstname: 'mai' } },
        { title: 'doc2', content: 'content' },
        { title: 'doc3', content: 'content' },
        { title: 'doc4', content: 'content' }
      ],
      metaData: {
        'totalCount': 4,
        'pages': 2,
        'currentPage': 1,
        'pageSize': 2
       }
    },
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

    it('should exist', () => {
      wrapper = setup(true);
      // console.log('kcvjhjjd kh gahd kzh dg dd', wrapper.state());
      expect(wrapper).toExist();
    });
    it('should exist', () => {
      wrapper = setup(false);
      expect(wrapper).toExist();
    });

    it('should have a clearSearch function', () => {
      wrapper = setup(true);
      expect(wrapper.node.clearSearch).toBeA('function');
    });

    it('should have a searchDocuments function', () => {
      wrapper = setup(true);
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
      //
      //
      // WRITE TEST FOR PAGINATION HERE
      //
      //
      pagination = wrapper.find('li[class="next-button"]');
      expect(wrapper.state().isLoading).toBe(false);
    });
  });
});
