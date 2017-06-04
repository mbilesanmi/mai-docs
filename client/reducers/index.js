import { combineReducers } from 'redux';
import users from './userReducer';
import isAuth from './authUserReducer';
import documents from './documentReducer';
// import manageRoles from './roleReducer';
// import manageSearch from './searchReducer';
// import currentlySelected from './currentlySelectedReducers';

const rootReducer = combineReducers({
  users,
  isAuth,
  documents,
  // manageRoles,
  // manageSearch,
  // currentlySelected
});

export default rootReducer;
