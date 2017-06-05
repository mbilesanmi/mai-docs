import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import DocumentForm from '../document/DocumentForm.jsx';
import * as documentActions from '../../actions/documentActions';

class ManageDocument extends Component {
  constructor(props, context) {
    super(props, context);

    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.createDocument = this.createDocument.bind(this);
    this.updateDocument = this.updateDocument.bind(this);

    this.state = {
      document: Object.assign({}, props.document),
      errors: {},
      saving: false
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextprops', this.props);
    if (this.props.document.id !== nextProps.document.id) {
      // Necessary to repopulate the form when document is loaded directly
      console.log('this.props', this.props);
      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }

  updateDocumentState(event) {
    let field;
    let document = this.state.document;
    if (event.value !== undefined) {
      field = 'viewAccess';
      document[field] = event.value;
    } else if (event.target.value !== undefined) {
      field = event.target.name;
      document[field] = event.target.value;
    }
    return this.setState({ document });
  }

  createDocument(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.createDocument(this.state.document)
    .then(() => {
      this.redirect();
    })
    .catch((error) => {
      console.log('error in creating document', error);
      this.setState({ saving: false });
      toastr.error('The document could not be created');
    });
  }
  updateDocument(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.updateDocument(this.state.document.id, this.state.document)
    .then(() =>
      this.redirect()
    )
    .catch((error) => {
      console.log('document state', this.state.document);
      console.log('error', error);
    });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Document saved successfully');
    this.context.router.push('/dashboard');
  }

  render() {
    const isUpdate = this.props.document.id;
    console.log('is update doc', isUpdate);
    return (
      <div className="section">
        <div className="container">
          {/*<DocumentTasks />*/}
          {/*<h1>Manage Documents</h1>*/}
          <DocumentForm
            document={this.state.document}
            onChange={this.updateDocumentState}
            onSave={isUpdate ? this.updateDocument : this.createDocument}
            errors={this.state.errors}
            saving={this.state.saving}
          />
        </div>
      </div>
    );
  }
}

ManageDocument.propTypes = {
  actions: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired
};

// Pull in the React Router context
// so router is available on this.context.router.
ManageDocument.contextTypes = {
  router: PropTypes.object
};

function getDocumentById(documents, id) {
  const document = documents.filter(document => String(document.id) === id);
  // Filter returns an array, have to grab the first.
  if (document) return document[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  console.log('ownProps', ownProps);
  const documentId = ownProps.params.id;

  let document = { id: '', title: '', content: '', viewAccess: '' };

  if (documentId && state.documents.length > 0) {
    document = getDocumentById(state.documents, documentId);
  }
  
  return {
    document
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDocument);


/*import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import DocumentListRow from './DocumentListRow.jsx';

const DocumentTask = () => (
      <div className="row">
        <div className="col s12">
          <Link to="" className="btn-floating btn-large waves-effect waves-light red">
            <i className="material-icons">add</i>
          </Link>
          
        </div>
      </div>
);

// DocumentTask.propTypes = {
//   documents: PropTypes.array.isRequired
// };

export default DocumentTask;*/
