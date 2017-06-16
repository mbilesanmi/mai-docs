import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentTasks from './DocumentTasks.jsx';

/**
 * @desc component used to display the list of documents
 */
const DocumentListRow = ({ document, loggedInUserID, users }) =>
  <div className="col s12 m6 l4">
    <div className="card medium hoverable z-depth-5">
      <div className="card-content">
        <h4>{document.title}</h4>
        <hr />
        <div className="col s12 light">
          <b>Published on:</b> {document.createdAt.slice(0, 10)}
        </div>
        <div className="col s12 light">
          <b>Accessibility:</b> {document.viewAccess}
        </div>
        <div className="col s12 light">
          <b>Author:</b> {document.User.firstname} {document.User.lastname}
        </div>
        <div className="col s12 light">
          {document.content.slice(0, 200)}...
        </div>
      </div>
      <div className="card-action">
        <Link
          to={`/document/view/${document.id}`}
          data-position="bottom"
          data-delay="50"
          data-tooltip="View document"
          className="waves-effect waves-light btn blue">View
        </Link>
        &nbsp;&nbsp;
        <DocumentTasks
          loggedInUserID={loggedInUserID}
          ownerId={document.ownerId}
          documentId={document.id} />
      </div>
    </div>
  </div>;

/**
 * @desc Set the PropTypes
 */
DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired,
  loggedInUserID: PropTypes.number
};

/**
 *
 * @param {any} state
 * @returns {*} props
 */
const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(DocumentListRow);
