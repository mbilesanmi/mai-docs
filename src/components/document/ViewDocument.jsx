import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import renderHTML from 'react-render-html';
import * as documentActions from '../../actions/documentActions.js';

/**
 * ViewDocument page
 * @class ViewDocument
 * @extends {React.Component}
 */
class ViewDocument extends Component {
  /**
   * Creates an instance of ViewDocument.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof ViewDocument
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      search: ''
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (this.props.documentId) {
      this.props.documentActions.getOneDocument(this.props.documentId);
    }
  }

  /**
   * @desc handles the triggering of the necessary action when the page reloads
   * @param {any} nextProps next props of component
   * @returns {null} returns no value
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.document.id !== nextProps.document.id) {
      // Necessary to repopulate the form when document is loaded directly
      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }

  /**
   * Renders the view of the component
   * @returns {Object} react component to render
   * @memberOf ManageDocuments
   */
  render() {
    const { document } = this.props;
    let createdAt;
    let role;

    if (document.id) {
      createdAt = document.createdAt.slice(0, 10);
    }

    return (
      <div className="container">
        <div className="section card-panel">
          <div className="text-center">
            <div className="icon-object border-success text-success">
              <i className="icon-plus3"></i>
            </div>
            <h3 className="docTitle center flow-text">
              {document.title}
            </h3>
            <div className="divider"></div>
            <div className="row">
              <div className="col s3">
                <i>Date Published: {createdAt}</i>
              </div>
            </div>
            <div className="row">
              <div className="col s9">
                {renderHTML(document.content)}
              </div>
            </div>

            <div className="row">
              <div className="col s8 offset-s2">
                <Link to="/dashboard" className="btn grey lighten-1 toDashboard">
                  Go to dashboard
                </Link>
                &nbsp;
                <Link to="/documents" className="btn grey lighten-1">
                  View All Documents
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns {*} props
 */
const mapStateToProps = (state, ownProps) => {
  const documentId = parseInt(ownProps.params.id, 10);

  let document = { id: '', title: '', content: '', access: '' };
  const stateDocument = state.documents;

  if (documentId && stateDocument) {
    if (stateDocument.id === documentId) {
      document = state.documents;
    }
  }

  return {
    documentId,
    document
  };
};

/**
 * @param {any} dispatch
 * @returns {any} actions as props
 */
const mapDispatchToProps = (dispatch) => ({
  documentActions: bindActionCreators(documentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewDocument);
