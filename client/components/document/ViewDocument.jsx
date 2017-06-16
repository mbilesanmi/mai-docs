import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as actions from '../../actions/documentActions';

/**
 * @desc component used to display all document view
 * @class ViewDocument
 * @extends {Component}
 */
class ViewDocument extends Component {
  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    this.props.actions.getOneDocument(this.props.documentId);
  }

  /**
   * @desc Renders the Document view
   * @return {*} html
   */
  render() {
    const { documents } = this.props;
    let createdAt;
    if (documents.id) {
      createdAt = documents.createdAt.slice(0, 10);
    }
    if (documents.id) {
      return (
        <div className="container">
          <div className="row">
            <div className="col s12 m12">
              <div className="card large">
                <div className="card-image" />
                <div className="card-content">
                  <span>
                    <h1>Title: {documents.title}</h1>
                    <div>
                      Date Created: {createdAt}<br />
                      Owner ID: {documents.User.firstname} {documents.User.lastname}
                    </div>
                    <div className="flow-text" dangerouslySetInnerHTML={ { __html: documents.content } } />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

/**
 * @desc Set the PropTypes
 */
ViewDocument.propTypes = {
  document: PropTypes.array,
  documentId: PropTypes.number,
  message: PropTypes.string
};

/**
 * @desc Set the contextTypes
 */
ViewDocument.contextTypes = {
  router: PropTypes.object
};

/**
 *
 * @param {any} state
 * @returns {*} props
 */
const mapStateToProps = (state, ownProps) => ({
  isAuth: state.isAuth,
  loggedInUserID: state.isAuth.loggedInUser.id,
  documentId: parseInt(ownProps.params.id, 10),
  documents: state.documents
});

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewDocument);
