import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import swal from 'sweetalert';
import toastr from 'toastr';
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
      search: '',
      isLoading: false
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    this.setState({ isLoading: true });
    if (this.props.documentId) {
      this.props.documentActions.getOneDocument(this.props.documentId)
      .then(() => {
        this.setState({ isLoading: false });
      });
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

  deleteDocument(event) {
    event.preventDefault();
    const id = event.target.getAttribute('name');
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this document!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false
    }, (isConfirm) => {
      if (isConfirm) {
        this.props.documentActions.deleteDocument(
          id, this.props.authUser.id)
        .then(() => {
          swal('Deleted!', 'The selected file has been deleted.', 'success');
          this.context.router.push('/dashboard');
        })
        .catch(() => {
          toastr.error('Unable to delete document');
        });
      } else {
        swal('Cancelled', 'Your document is safe :)', 'error');
      }
    });
  }

  /**
   * Renders the view of the component
   * @returns {Object} react component to render
   * @memberOf ManageDocuments
   */
  render() {
    const { document, authUser } = this.props;
    let createdAt;
    let access;
    let manageDocument;

    if (authUser.id === document.ownerId) {
      manageDocument = <div className="col s3">
        <Link
          to={`/document/${document.id}`}
          className="waves-effect waves-light btn green darken-2 editDoc">
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </Link>
        &nbsp;
        <button
          onClick={this.deleteDocument}
          name={document.id}
          className="waves-effect waves-light btn red darken-2 deleteDoc">
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>;
    } else {
      manageDocument = '';
    }

    if (document.id) {
      createdAt = document.createdAt.slice(0, 10);
    }

    if (document.access === -1) {
      access = 'Private';
    } else if (document.access === 0) {
      access = 'Public';
    } else {
      access = 'Role based';
    }

    if (this.state.isLoading) {
      return (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
      );
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
                <i><b>Date Published:</b> {createdAt}</i>
              </div>
              <div className="col s3">
                <i><b>Access Type:</b> {access}</i>
              </div>
              {manageDocument}
              <div className="clearfix"></div>
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
 * @desc Set the contextTypes
 */
ViewDocument.contextTypes = {
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
  const authUser = state.authenticated.user;

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
    authUser
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
