import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentTasks from './DocumentTasks.jsx';

const DocumentListRow = ({ document, loggedInUserID }) => (
  <div className="col s12 m6 l4">
      <div className="card medium hoverable z-depth-5">
        <div className="card-content">
          <h4>{document.title}</h4>
          <div className="col s12 light">
            <b>Published on:</b> {document.createdAt}
          </div>
          <div className="col s12 light">
            <b>Access:</b> {document.viewAccess}
          </div>
          <div className="col s12 light">
            {document.content}
          </div>
        </div>
        <div className="card-action">
          <Link
            to={`/document/view/${document.id}`}
            data-position="bottom"
            data-delay="50"
            data-tooltip="View document"
            className="btn-floating blue tooltipped">
            <i className="material-icons">visibility</i>
          </Link>
          &nbsp;&nbsp;
          <DocumentTasks
            loggedInUserID={loggedInUserID}
            ownerId={document.ownerId}
            documentId={document.id} />
        </div>
      </div>
    </div>
  );

DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired,
  loggedInUserID: PropTypes.number
};

export default DocumentListRow;
