import axios from 'axios';

/**
* Set and use a token for every axios call
* @param {Object} token
* @returns {Undefined} returns nothing
*/
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
