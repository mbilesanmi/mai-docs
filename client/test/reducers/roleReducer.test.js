// import expect from 'expect';
// import { createStore } from 'redux';
// import rootReducer from '../../reducers';
// import roleReducer from '../../reducers/roleReducer';
// import initialState from '../../reducers/initialState';
// import * as actions from '../../actions/roleActions';

// describe('Role reducer', () => {
//   it('should return an array of roles.', () => {
//     const store = createStore(rootReducer, initialState);

//     const roles = [
//       { title: 'Admin' },
//       { title: 'Author' }
//     ];

//     const action = actions.getRoleSuccess(roles);
//     store.dispatch(action);

//     const actual = store.getState().roles;
//     const expected = roles;

//     expect(actual).toEqual(expected);
//   });
// });
