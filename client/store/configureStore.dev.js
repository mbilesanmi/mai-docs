import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/**
 * Configure redux store for development environment
 *
 * @export
 * @param {Object} initialState
 * @returns {Function} configuration function
 */
const configureStore = (initialState) => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose;
  /* eslint-enable */
  return createStore(
    rootReducer,
    initialState,
    /* preloadedState, */
    composeEnhancers(
      applyMiddleware(thunk, reduxImmutableStateInvariant())
    )
  );
};

export default configureStore();
