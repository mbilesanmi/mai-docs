import { combineReducers } from 'redux';
import users from './userReducer';
import isAuth from './authUserReducer';
import documents from './documentReducer';
import message from './messageReducer';
import searchResults from './searchReducer';
import roles from './roleReducer';

const rootReducer = combineReducers({
  users,
  isAuth,
  documents,
  message,
  searchResults,
  roles
});

export default rootReducer;
