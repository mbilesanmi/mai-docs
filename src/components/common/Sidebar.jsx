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
    className="waves-effect btn green lighten-2 addDocument">
  Add New Document</Link>

  <div className="card-panel">
    <h6 className="sidebar-title">My Profile</h6>
    <div className="divider"></div>
    <div>{ userDetails }</div>
  </div>

  <div className="card-panel">
    <h6 className="sidebar-title left">Search</h6>
    <a className="right" onClick={clearSearch}>x</a>
    <div className="clearfix"></div>
    <div className="divider"></div>
    <form onSubmit={search}>
      <input
        id="search"
        type="text"
        onKeyUp={updateSearchState}
        placeholder="Search here" />
    </form>
  </div>

  <div className="card-panel">
    <h6 className="sidebar-title">Documents Summary</h6>
    <div className="divider"></div>
    <p>Show the count of each document type here</p>
  </div>
</div>;

Sidebar.PropTypes = {
  search: PropTypes.func,
  updateSearchState: PropTypes.func
};

export default Sidebar;
