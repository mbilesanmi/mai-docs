import React from 'react';

const DocumentActionBar = ({
    redirectToManageDocument, onViewAccessChange,
    sitewide, onSearchChange }) =>
  <div className="row">
    <div className="col l3 m3 s1 offset-l1">
      <a
        onClick={redirectToManageDocument}
        className="waves-effect waves-light btn-large green">
        <i className="material-icons left">add</i>Add New Document
      </a>
    </div>

    <div className="col l1 m1 s1">
      <h5>Search:</h5>
    </div>

    <div className="col l6 m5 s12">
      <form>
        <div className="input-field">
          <input
            id="search"
            type="search"
            onKeyUp={onSearchChange}
            placeholder="Search within your own documents" />
          <i className="material-icons">close</i>
        </div>
      </form>
    </div>
  </div>;

DocumentActionBar.propTypes = {
  redirectToManageDocument: React.PropTypes.func,
  onViewAccessChange: React.PropTypes.func,
  sitewide: React.PropTypes.string,
  onSearchChange: React.PropTypes.func
};

export default DocumentActionBar;
