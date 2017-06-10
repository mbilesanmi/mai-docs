import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ViewDocument extends Component {
  render() {
    const { users, documents } = this.props;

    return (
      <div className="container">
        {documents.filter(document => document.id === this.props.documentId)
        .map(document =>
          <span key="document.id">
            <h1>Title: {document.title}</h1>
            <div>
              Date Created: {document.createdAt.slice(0, 10)}<br />
              Owner ID: {users.filter(user =>
                user.id === document.ownerId
              ).map(user =>
                <span key={user.id}>
                  {user.firstname} {user.lastname}
                </span>
              )}
            </div>
            <span>
              {document.content}
            </span>
          </span>
        )}
      </div>
    );
  }
}

ViewDocument.propTypes = {
  documents: PropTypes.array.isRequired,
  documentId: PropTypes.number,
  message: PropTypes.string,
  users: PropTypes.object
};

// Pull in the React Router context
// so router is available on this.context.router.
ViewDocument.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
  users: state.users,
  documentId: parseInt(ownProps.params.id, 10),
  documents: state.documents
});

export default connect(mapStateToProps)(ViewDocument);
