import React, { PropTypes } from 'react';

/**
 * @desc component used to display the user action bar
 */
const UserActionBar = ({ onRoleChange, onSearchChange, clearSearch }) =>
  <div className="row">

    <div className="col l8 m8 s12 offset-l2 offset-m2">
      <form>
        <div className="input-field">
          <input
            id="search"
            type="search"
            onKeyUp={onSearchChange}
            placeholder="Search for users" />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
          <i className="material-icons" onClick={clearSearch}>close</i>
        </div>
      </form>
    </div>
  </div>
;

/**
 * @desc Set the PropTypes
 */
UserActionBar.propTypes = {
  onRoleChange: PropTypes.func,
  clearSearch: PropTypes.func,
  onSearchChange: PropTypes.func
};

export default UserActionBar;
