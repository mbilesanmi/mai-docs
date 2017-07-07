import React from 'react';
import sinon, { spy } from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { AllUsers } from '../../../components/home/AllUsers.jsx';

let wrapper;
let props;

/**
 * @desc handles the triggering of the necessary action
 * @param {*} isAuthenticated
 * @param {*} oneUser
 * @param {*} allUsers
 * @returns {null} returns no value
 */
function setup(isAuthenticated, oneUser, allUsers) {
  props = {
    allUsers,
    isAuthenticated,
    oneUser,
    userActions: {
      getAllUsers: spy(() => new Promise((resolve) => { resolve(); })),
      searchAllUsers: spy(() => new Promise((resolve) => { resolve(); })),
      getOneUser: spy(() => new Promise((resolve) => { resolve(); }))
    },
    authUser: { id: 1, roleId: 1, expiresIn: '1hr', iat: 1498921548 },
    message: ''
  };

  return mount(<AllUsers {...props} />);
}

/**
 * @desc handles the triggering of the necessary action
 * @param {*} isAuthenticated
 * @param {*} oneUser
 * @param {*} allUsers
 * @returns {null} returns no value
 */
function shallowSetup(isAuthenticated, oneUser, allUsers) {
  props = {
    allUsers,
    isAuthenticated,
    oneUser,
    userActions: {
      getAllUsers: spy(() => new Promise((resolve) => { resolve(); })),
      searchAllUsers: spy(() => new Promise((resolve) => { resolve(); })),
      getOneUser: spy(() => new Promise((resolve) => { resolve(); }))
    },
    authUser: { id: 1, roleId: 1, expiresIn: '1hr', iat: 1498921548 },
    message: ''
  };

  const context = { router: [] };

  return shallow(<AllUsers {...props} />, { context });
}

describe('AllUsers component', () => {
  let userDetails;
  let pagination;
  const allUsers = {
    users: [
      { username: 'mai', id: 1, email: 'a@a.c', Role: { title: 'Admin' } },
      { username: 'ade', id: 2, email: 'b@b.c' },
      { username: 'tom', id: 3, email: 'c@c.c' },
      { username: 'hope', id: 4, email: 'd@d.c' }
    ],
    metaData: {
      'totalCount': 4,
      'pages': 2,
      'currentPage': 1,
      'pageSize': 2
      }
  };
  const noUsers = null;
  const user = {
    id: 1,
    firstname: 'mai',
    lastname: 'mai',
    username: 'mai',
    email: 'mai@mai.com',
    Role: { title: 'Admin' }
  }

  it('should render appropriately', () => {
    wrapper = setup(true);
    expect(wrapper).toExist();
  });

  it('should have a clearSearch function', () => {
    wrapper = setup(true, user, allUsers);
    expect(wrapper.node.clearSearch).toBeA('function');
  });

  it('should have a searchUsers function', () => {
    wrapper = setup(true, user, allUsers);
    expect(wrapper.node.searchUsers).toBeA('function');
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
      expect(wrapper.props().userActions.searchAllUsers.called).toBe(true);
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

    expect(wrapper.props().allUsers.metaData.pageSize).toBe(2);
    wrapper.instance().handlePageClick({ selected: 1 });
    expect(wrapper.state().offset).toBe(2);
    expect(wrapper.state().offset).toBe(wrapper.props().allUsers.metaData.pageSize);
    expect(wrapper.props().userActions.getAllUsers.called).toBe(true);
  });

  it('should handle pagination when searching', () => {
    props.allUsers.search = 'doc';
    wrapper = mount(<AllUsers {...props} />);
    wrapper.setState({ search: 'hello world', isLoading: false });
    wrapper.instance().handlePageClick({ selected: 1 });
    expect(wrapper.props().userActions.searchAllUsers.called).toBe(true);
  });
});
