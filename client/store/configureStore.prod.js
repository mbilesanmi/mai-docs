import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/**
 * Configure redux store for production environment
 *
 * @export
 * @param {Object} initialState
 * @returns {Function} configuration function
 */
const configureStore = (initialState) =>
createStore(
  rootReducer,
  initialState,
    applyMiddleware(thunk)
);

export default configureStore();
