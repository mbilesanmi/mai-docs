import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentTasks from './DocumentTasks.jsx';

const DocumentListRow = ({ document, loggedInUserID }) => (
  <div className="col s12 m6 l4">
      <div className="card medium hoverable z-depth-5">
        <div className="card-content">
          <h4>{document.title}</h4>
          <div className="col s12 light">
            <b>Published on:</b> {document.createdAt}
          </div>
          <div className="col s12 light">
            <b>Access:</b> {document.viewAccess}
          </div>
          <div className="col s12 light">
            {document.content}
          </div>
        </div>
        <div className="card-action">
          <Link
            to={`/document/view/${document.id}`}
            data-position="bottom"
            data-delay="50"
            data-tooltip="View document"
            className="btn-floating blue tooltipped">
            <i className="material-icons">visibility</i>
          </Link>
          &nbsp;&nbsp;
          <DocumentTasks loggedInUserID={loggedInUserID} ownerId={document.ownerId} documentId={document.id} />
        </div>
      </div>
    </div>
  );

DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired,
  loggedInUserID: PropTypes.number
};

export default DocumentListRow;


/*import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import toastr from 'toastr';
import * as documentActions from '../../actions/documentActions';

class DocumentListRow extends Component {
  constructor(props, context) {
    super(props, context);

    this.deleteDocument = this.deleteDocument.bind(this);
  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
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
          this.props.document.id, this.props.document.ownerId)
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
    console.log('props', this.props);
    let ownerActionsTag;
    if (this.props.loggedInID === this.props.document.ownerId) {
      ownerActionsTag = (
        <span>
          <span>
            <Link
              to={`/document/${this.props.document.id}`}
              data-position="top"
              data-delay="50"
              data-tooltip="View document"
              className="btn btn-floating green tooltipped">
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
    return (
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
  loggedInID: PropTypes.number
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentListRow);*/