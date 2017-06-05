import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import toastr from 'toastr';
import * as documentActions from '../../actions/documentActions';

class DocumentListRow extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      id: 0
    };

    // this.editDocument = this.editDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    // this.confirmDelete = this.confirmDelete.bind(this);
  }

  // deleteDocument() {
  //   this.setState({ id: 0 });
  // }

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
          this.props.document.id, this.props.document.ownerId)
        .then(() =>
          swal('Deleted!', 'The selected file has been deleted.', 'success')
        )
        .catch(() => {
          toastr.error('Unable to delete document');
        });
      } else {
        swal('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }

  render() {
    console.log('props', this.props.currentUrlPath);
    let ownerActionsTag = '';
    if (this.props.loggedInID === this.props.document.ownerId) {
      ownerActionsTag =
        (
          <span>
            <span>
              <Link to={`/document/${this.props.document.id}`}
                className="btn-floating green">
                <i id={this.props.document.id} className="material-icons">
                  mode_edit
                </i>
              </Link>
            </span>
            <span>&nbsp;&nbsp;</span>
            <span>
              <a className="btn tooltipped btn-floating red"
                data-position="bottom"
                data-delay="50"
                data-tooltip="Delete document"
                onClick={this.deleteDocument}>
                <i id={this.props.document.id} className="material-icons">
                  delete
                </i>
              </a>
            </span>
          </span>
        );
    }
    return(
      <div className="col s12 m6 l4">
        <div className="card medium hoverable z-depth-5">
          <div className="card-content">
            <h4>{this.props.document.title}</h4>
            <div className="col s12 light">
              <b>Published on:</b> {this.props.document.createdAt}
            </div>
            <div className="col s12 light">
              <b>Access:</b> {this.props.document.viewAccess}
            </div>
            <div className="col s12 light">
              {this.props.document.content}
            </div>
          </div>
          <div className="card-action">
            <Link
              to={`/document/${this.props.document.id}`}
              data-position="bottom"
              data-delay="50"
              data-tooltip="Delete document"
              className="btn-floating blue tooltipped">
              <i className="material-icons">visibility</i>
            </Link>
            &nbsp;&nbsp;
            { ownerActionsTag }
          </div>
        </div>
      </div>
    );
  }
}

DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  currentUrlPath: PropTypes.string
};

// Pull in the React Router context
// so router is available on this.context.router.
DocumentListRow.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentListRow);
