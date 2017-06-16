import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import toastr from 'toastr';
import * as documentActions from '../../actions/documentActions';

/**
 * @desc component used to display document tasks
 * @class DocumentTasks
 * @extends {Component}
 */
class DocumentTasks extends Component {
  /**
   * Creates an instance of DocumentTasks.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof DocumentTasks
   */
  constructor(props, context) {
    super(props, context);

    this.deleteDocument = this.deleteDocument.bind(this);
  }

  /**
   * @desc handles the document delete
   * @param {any} event html event
   * @returns {*} no return value
   */
  deleteDocument(event) {
    event.preventDefault();
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
        this.props.actions.deleteDocument(
          this.props.documentId, this.props.ownerId)
        .then(() =>
          swal('Deleted!', 'The selected file has been deleted.', 'success')
        )
        .catch(() => {
          toastr.error('Unable to delete document');
        });
      } else {
        swal('Cancelled', 'Your document is safe :)', 'error');
      }
    });
  }

  /**
   * @desc Renders the Document tasks buttons
   * @return {*} render the Document task buttons
   */
  render() {
    if (this.props.ownerId === this.props.loggedInUserID) {
      return (
        <span>
          <Link
            to={`/document/${this.props.documentId}`}
            className="waves-effect waves-light btn green">Edit
          </Link>
          &nbsp;&nbsp;
          <a className="waves-effect waves-light btn red"
            onClick={this.deleteDocument}>Delete
          </a>
        </span>
      );
    }
    return null;
  }
}

/**
 * @desc Set the PropTypes
 */
DocumentTasks.propTypes = {
  documentId: PropTypes.number,
  ownerId: PropTypes.number,
  loggedInUserID: PropTypes.number,
  actions: PropTypes.object.isRequired
};

/**
 * @desc Set the contextTypes
 */
DocumentTasks.contextTypes = {
  router: PropTypes.object
};

/**
 *
 * @param {any} state
 * @returns {*} props
 */
const mapStateToProps = state => ({
  loggedInID: state.isAuth.loggedInUser.id
});

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(documentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTasks);
