import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentTasks from './DocumentTasks.jsx';

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
            <b>Author:</b> {users.filter(user =>
              user.id === document.ownerId
            ).map(user =>
              <span key={user.id}>
                {user.firstname} {user.lastname}
              </span>
            )}
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

DocumentListRow.propTypes = {
  document: React.PropTypes.object.isRequired,
  loggedInUserID: React.PropTypes.number,
  users: React.PropTypes.array
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(DocumentListRow);
