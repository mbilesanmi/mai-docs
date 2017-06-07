import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import swal from 'sweetalert';
// import toastr from 'toastr';
// import * as documentActions from '../../actions/documentActions';

class ViewDocument extends Component {
  // componentWillMount() {
  //   this.props.actions.getOneDocument(this.props.documentId)
  //   .then(() => {
  //     toastr.success(this.props.message);
  //     // this.props.userActions.getOne()
  //   })
  //   .catch(() => {
  //     toastr.error(this.props.message);
  //     this.context.router.push('/404');
  //   });
  // }

  render() {
    const documents = this.props.documents;
    console.log('documentsid', this.props.documents);
    return (
      // {documents.filter(document => 
      //   return )
      // }
      <div className="container">
        {documents.filter(document => document.id === this.props.documentId)
        .map(document =>
          <span>
            <h1>Title: {document.title}</h1>
            <div>
              Date Created: {document.createdAt}<br />
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
          {/*return document.id === this.props.documentId;*/}

ViewDocument.propTypes = {
  documents: PropTypes.array.isRequired,
  documentId: PropTypes.number,
  message: PropTypes.string,
  // actions: PropTypes.object.isRequired
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
    // message: state.message
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(documentActions, dispatch)
//   };
// }

export default connect(mapStateToProps)(ViewDocument);
