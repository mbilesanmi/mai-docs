import { combineReducers } from 'redux';
import manageUsers from './userReducer';
// import auth from './authUserReducer';
// import manageDocuments from './documentReducer';
// import manageRoles from './roleReducer';
// import manageSearch from './searchReducer';
// import currentlySelected from './currentlySelectedReducers';

const rootReducer = combineReducers({
  manageUsers,
  // auth,
  // manageDocuments,
  // manageRoles,
  // manageSearch,
  // currentlySelected
});

export default rootReducer;
