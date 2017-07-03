import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import * as documentActions from '../../actions/documentActions.js';
import DocumentForm from './DocumentForm.jsx';

/**
 * ManageDocument page view
 * @class ManageDocument
 * @extends {React.Component}
 */
export class ManageDocument extends Component {
  /**
   * Creates an instance of ManageDocument.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof ManageDocument
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      document: Object.assign({}, props.document),
      content: '',
      saving: false
    };

    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.createDocument = this.createDocument.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
    this.onModelChange = this.onModelChange.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
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
   * @desc handles form element changes
   * @param {any} event html event
   * @returns {*} no return value
   */
  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    return this.setState({ document });
  }

  /**
   * @desc handles froala textarea change
   * @param {any} content html event
   * @returns {*} no return value
   */
  onModelChange(content) {
    const document = this.state.document;
    document.content = content;
    this.setState({ document, content });
  }

  /**
   * @desc handles create form actions
   * @param {any} event html event
   * @returns {*} no return value
   */
  createDocument(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.documentActions.createDocument(this.state.document)
    .then(() => this.redirectToDashboard())
    .catch(() => {
      this.setState({ saving: false });
      toastr.error(this.props.message[0].message);
    });
  }

  /**
   * @desc handles update form actions
   * @param {any} event html event
   * @returns {*} no return value
   */
  updateDocument(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.documentActions.updateDocument(
      this.state.document.id, this.state.document)
    .then(() => this.redirectToDashboard())
    .catch(() => {
      this.setState({ saving: false });
      toastr.error(this.props.message);
    });
  }

  /**
   * @desc handles the redirecting to the dashboard on success
   * @returns {null} returns no value
   */
  redirectToDashboard() {
    this.setState({ saving: false });
    toastr.success(this.props.message);
    this.context.router.push('/dashboard');
  }

  /**
   * Renders the view of the component
   * @returns {Object} react component to render
   * @memberOf ManageDocument
   */
  render() {
    const { document } = this.state;
    const isUpdate = document.id;
    const documentTitle = document.title;

    return (
      <div className="container">
        <div className="section card-panel">
          <div className="text-center">
            <div className="icon-object border-success text-success">
              <i className="icon-plus3"></i>
            </div>
            <h5 className="center flow-text">
              {isUpdate ? `Edit: ${documentTitle}` : 'Add new document'}
            </h5>
            <div className="center red-text">
              <small>
                All fields are required
              </small>
            </div>
            <div className="divider"></div>
          </div>

          <DocumentForm
            document={document}
            roleId={this.props.roleId}
            onChange={this.updateDocumentState}
            onModelChange={this.onModelChange}
            onSave={isUpdate ? this.updateDocument : this.createDocument}
            saving={this.state.saving} />
        </div>
      </div>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
ManageDocument.PropTypes = {
  message: PropTypes.string,
  document: PropTypes.object,
  roleId: PropTypes.number,
  documentId: PropTypes.number,
  documentActions: PropTypes.object
};

/**
 * @desc Set the contextTypes
 */
ManageDocument.contextTypes = {
  router: PropTypes.object
};

/**
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns {*} props
 */
const mapStateToProps = (state, ownProps) => {
  const documentId = parseInt(ownProps.params.id, 10);
  const authorId = state.authenticated.user.id;
  const roleId = state.authenticated.user.roleId;
  const message = state.message;

  let document = { id: '', title: '', content: '', access: '' };
  const stateDocument = state.documents;

  if (documentId && stateDocument) {
    if (stateDocument.id === documentId) {
      document = state.documents;
    }
  }

  return {
    documentId,
    document,
    authorId,
    roleId,
    message
  };
};

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = (dispatch) => ({
  documentActions: bindActionCreators(documentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDocument);
