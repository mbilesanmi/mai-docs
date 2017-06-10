import React, { PropTypes } from 'react';

const DocumentActionBar = ({
    redirectToManageDocument, onViewAccessChange, sitewide, onSearchChange }) => (
  <div className="row">
    <div className="col l3 m3 s1">
      <a
        onClick={redirectToManageDocument}
        className="waves-effect waves-light btn-large green">
        <i className="material-icons left">add</i>Add New Document
      </a>
    </div>

    <div className="col l5 m5 s12">
      <form>
        <div className="input-field">
          <input
            id="search"
            type="search"
            onKeyUp={onSearchChange}
            value=""s
            placeholder="Search within your own documents" />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
          <i className="material-icons">close</i>
        </div>
      </form>
    </div>

    <div className="input-field col l4 m4 s12">
      <form action="#">
        <h6>Filter by Accessibility:</h6>
        <input
          onClick={onViewAccessChange}
          className="with-gap"
          name="viewAccess"
          value="All"
          type="radio"
          id="all" />
        <label htmlFor="all">All</label>

        <input
          onClick={onViewAccessChange}
          className="with-gap"
          name="viewAccess"
          value="Public"
          type="radio"
          id="public" />
        <label htmlFor="public">Public</label>

        {sitewide ? '' :
        <span>
          <input
            onClick={onViewAccessChange}
            className="with-gap"
            name="viewAccess"
            value="Private"
            type="radio"
            id="private" />
          <label htmlFor="private">Private</label>
        </span>
        }

        <input
          onClick={onViewAccessChange}
          className="with-gap"
          name="viewAccess"
          value="Role"
          type="radio"
          id="role" />&nbsp;
        <label htmlFor="role">Role</label>
      </form>
    </div>
  </div>
);

DocumentActionBar.propTypes = {
  redirectToManageDocument: PropTypes.func,
  onViewAccessChange: PropTypes.func,
  sitewide: PropTypes.string,
  onSearchChange: PropTypes.func
};

export default DocumentActionBar;
