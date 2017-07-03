// import React from 'react';
// import sinon, { spy } from 'sinon';
// import expect from 'expect';
// import { shallow, mount, render } from 'enzyme';
// import { MemoryRouter } from 'react-router';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import configureMockStore from 'redux-mock-store'
// import { Dashboard } from '../../components/home/Dashboard.jsx';

// let wrapper;
// let newProps;

// // const mockStore = configureMockStore([thunk]);
// // const store = mockStore({
// //   authReducer: {},
// //   userReducer: {}
// // });

// /**
//  * @desc handles the triggering of the necessary action
//  * @param {*} isAuthenticated
//  * @returns {null} returns no value
//  */
// function setup(isAuthenticated, user, documents) {
//   const spyPaginate = sinon.spy(Dashboard.prototype, 'handlePageClick');
//   const props = {
//     user,
//     documents,
//     isAuthenticated,
//     userActions: { getOneUser: spy(() => new Promise((resolve) => { resolve(); })) },
//     documentActions: {
//       //
//       // ADD PROMISE REJECTION HERE
//       //
//       deleteDocuments: spy(() => new Promise((resolve, reject) => { resolve(); })),
//       getUserDocuments: spy(() => new Promise((resolve) => { resolve(); })),
//       searchUserDocuments: spy(() => new Promise((resolve, reject) => { resolve(); }))
//     },
//     authUser: { id: 1, roleId: 1, expiresIn: '1hr', iat: 1498921548 },
//     message: ''
//   };

//   return mount(<Dashboard {...props} />);
// }

// describe('The Dashboard', () => {
//   describe('component <Dashboard />', () => {
//     let component;
//     let userDetails;
//     let documentDetails;
//     let pagination;
//     const documents = {
//       documents: [
//         { title: 'doc1', content: 'content', User: { firstname: 'mai' } },
//         { title: 'doc2', content: 'content' },
//         { title: 'doc3', content: 'content' },
//         { title: 'doc4', content: 'content' }
//       ],
//       metaData: {
//         'totalCount': 4,
//         'pages': 2,
//         'currentPage': 1,
//         'pageSize': 2
//        }
//     };
//     const noDocuments = {};
//     const user = { id: 1, firstname: 'mai', lastname: 'mai', username: 'mai', email: 'mai@mai.com', Role: { title: 'Admin' } }

//     it('should exist', () => {
//       wrapper = setup(true);
//       // console.log('kcvjhjjd kh gahd kzh dg dd', wrapper.state());
//       expect(wrapper).toExist();
//     });

//     it('should exist', () => {
//       wrapper = setup(false, null, noDocuments);
//       expect(wrapper).toExist();
//     });

//     it('should exist', () => {
//       wrapper = setup(true, user, noDocuments);
//       expect(wrapper).toExist();
//     });

//     it('should have a clearSearch function', () => {
//       wrapper = setup(true, user, documents);
//       expect(wrapper.node.clearSearch).toBeA('function');
//     });

//     it('should have a searchDocuments function', () => {
//       wrapper = setup(true, user, documents);
//       expect(wrapper.node.searchDocuments).toBeA('function');
//     });

//     it('should have a searchDocuments function', () => {
//       wrapper = setup(true, user, documents);
//       expect(wrapper.node.searchDocuments).toBeA('function');
//     });

//     it('should change state when search is done', () => {
//       const input = wrapper.find('input[id="search"]');
//       input.simulate('keyUp', {
//         preventDefault: () => {
//         },
//         target: { value: 'ade' } });
//       expect(wrapper.state().search).toEqual('ade');
//     });

//     it('should search when form is submitted', () => {
//       const form = wrapper.find('form[id="search"]');
//       form.simulate('submit', {
//         preventDefault: () => {
//         },
//         target: { value: 'ade' } });
//       expect(wrapper.state().isLoading).toBeTruthy();
//     });

//     it('should clear the search results', () => {
//       const clear = wrapper.find('a[id="clearSearch"]');
//       clear.simulate('click', {
//         preventDefault: () => {
//         }
//       });
//       expect(wrapper.state().isLoading).toBe(false);
//     });

//     // it('should delete a document', () => {
//     //   const deleteDoc = wrapper.find('i[id="deleteDoc"]');
//     //   deleteDoc.simulate('click', {
//     //     preventDefault: () => {
//     //     }
//     //   });
//     //   expect(wrapper.state().isLoading).toBe(false);
//     // });

//     it('should handle pagination click', () => {
//       //
//       //
//       // WRITE TEST FOR PAGINATION HERE
//       //
//       //
//       pagination = wrapper.find('li[class="next-button"]');
//       expect(wrapper.state().isLoading).toBe(false);
//     });

//     /*it('should map state to props', () => {
//       newProps = {
//         match: { url: '/dashboard' },
//       };
//       wrapper = mount(<MemoryRouter>
//         <Provider store={store}><DefaultDashboard {...newProps} /></Provider>
//       </MemoryRouter>);
//       expect(wrapper).to.be.present();
//     });*/
//   });
// });
