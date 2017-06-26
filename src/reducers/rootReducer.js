import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import users from './userReducer';
import message from './messageReducer';
import documents from './documentReducer';
import authenticated from './authReducer';
import allUsers from './allUsersReducer';

const combinedReducers = combineReducers({
  authenticated,
  users,
  allUsers,
  message,
  documents
});

export default reduceReducers(combinedReducers);
