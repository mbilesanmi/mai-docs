import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as actions from '../../actions/documentActions';

class ViewDocument extends Component {
  componentWillMount() {
    this.props.actions.getOneDocument(this.props.documentId);
  }

  render() {
    const { documents } = this.props;
    let createdAt;
    if (documents.id) {
      createdAt = documents.createdAt.slice(0, 10);
    }
    if (documents.id) {
      return (
        <div className="container">
          <span>
            <h1>Title: {documents.title}</h1>
            <div>
              Date Created: {createdAt}<br />
              Owner ID: {documents.User.firstname} {documents.User.lastname}
            </div>
            <span>
              <div dangerouslySetInnerHTML={ { __html: documents.content } } />
            </span>
          </span>
        </div>
      );
    }
    return null;
  }
}

ViewDocument.propTypes = {
  document: PropTypes.array,
  documentId: PropTypes.number,
  message: PropTypes.string
};

// Pull in the React Router context
// so router is available on this.context.router.
ViewDocument.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.isAuth,
  loggedInUserID: state.isAuth.loggedInUser.id,
  documentId: parseInt(ownProps.params.id, 10),
  documents: state.documents
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewDocument);
