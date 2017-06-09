import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ViewDocument extends Component {

  render() {
    const documents = this.props.documents;
    return (
      <div className="container">
        {documents.filter(document => document.id === this.props.documentId)
        .map(document =>
          <span key="document.id">
            <h1>Title: {document.title}</h1>
            <div>
              Date Created: {document.createdAt.slice(0, 10)}<br />
              Owner ID: {document.ownerId}
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
};

// Pull in the React Router context
// so router is available on this.context.router.
ViewDocument.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    documentId: parseInt(ownProps.params.id, 10),
    documents: state.documents
  };
}

export default connect(mapStateToProps)(ViewDocument);
