import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * @desc component used to display the sidebar
 * @returns {*} html content
 */
const Sidebar = ({ search, clearSearch, updateSearchState, userDetails }) =>
<div className="col s12 m12 l3">
  <div className="clearfix"></div>
  <Link to="/document"
    className="waves-effect btn green darken-2 addDocument">
  Add New Document</Link>

  <div className="card-panel">
    <h6 className="sidebar-title left">Search</h6>
    <a className="right" id="clearSearch" onClick={clearSearch}>x</a>
    <div className="clearfix"></div>
    <div className="divider"></div>
    <form id="search" onSubmit={search}>
      <input
        id="search"
        type="text"
        onKeyUp={updateSearchState}
        placeholder="Search here" />
    </form>
  </div>

  <div className="card-panel">
    <h6 className="sidebar-title">My Profile</h6>
    <div className="divider"></div>
    <div>{ userDetails }</div>
  </div>
</div>;

/**
 *  Proptypes declaration
 */
Sidebar.PropTypes = {
  search: PropTypes.func,
  userDetails: PropTypes.object,
  clearFrom: PropTypes.func,
  updateSearchState: PropTypes.func
};

export default Sidebar;
