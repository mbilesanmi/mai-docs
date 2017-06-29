import axios from 'axios';
import jwt from 'jsonwebtoken';

/**
 * Set the a value inside localStorage
 * @export
 * @param {String} key - key to store value with in localStorage
 * @param {String} value - item to store inside localStorage
 * @returns {Promise} returns a promise and resolves it with the stored value
 */
export const setLocalstorage = (key, value) => {
  let storedValue;
  return new Promise((resolve) => {
    window.localStorage.setItem(key, value);
    storedValue = window.localStorage.getItem(key);
    if (storedValue) {
      resolve(storedValue);
    }
  });
};

/**
 * set a default header in axios
 * @export
 * @param {String} token - value to set header as
 * @returns {Void} does not have a return value
 */
export const setDefaultHeader = (token) => {
  axios.defaults.headers.common['x-access-token'] = token;
};


/**
 * clear or remove one or all items from localStorage
 * @export
 * @param {String} key - item to remove in localStorage
 * @returns {Void} does not have a return value
 */
export const clearStorage = (key) => {
  if (!key) {
    window.localStorage.clear();
  } else {
    window.localStorage.removeItem(key);
  }
};

/**
 * Checks if the token is set and updates state accordingly
 * @export
 * @returns {*} state
 */
export const checkAuth = () => {
  const token = window.localStorage.getItem('maiDocsJwtToken');
  if (!token) {
    return {
      isAuth: false,
      user: null
    };
  } else if (token) {
    const decoded = jwt.decode(token);
    if (decoded) {
      if (decoded.exp < Date.now() / 1000) {
        return {
          isAuth: false,
          user: null
        };
      }
      return {
        isAuth: true,
        user: decoded
      };
    }
    return {
      isAuth: false,
      user: null
    };
  }
};
