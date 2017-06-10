import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import toastr from 'toastr';
import * as documentActions from '../../actions/documentActions';

class DocumentTasks extends Component {
  constructor(props, context) {
    super(props, context);

    this.deleteDocument = this.deleteDocument.bind(this);
  }

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

DocumentTasks.propTypes = {
  documentId: PropTypes.number,
  ownerId: PropTypes.number,
  loggedInUserID: PropTypes.number,
  actions: PropTypes.object.isRequired
};

// Pull in the React Router context
// so router is available on this.context.router.
DocumentTasks.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    loggedInID: state.isAuth.loggedInUser.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTasks);
