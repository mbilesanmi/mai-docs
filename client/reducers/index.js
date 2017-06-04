import { combineReducers } from 'redux';
import manageUsers from './userReducer';
import isAuth from './authUserReducer';
// import manageDocuments from './documentReducer';
// import manageRoles from './roleReducer';
// import manageSearch from './searchReducer';
// import currentlySelected from './currentlySelectedReducers';

const rootReducer = combineReducers({
  manageUsers,
  isAuth,
  // manageDocuments,
  // manageRoles,
  // manageSearch,
  // currentlySelected
});

export default rootReducer;
