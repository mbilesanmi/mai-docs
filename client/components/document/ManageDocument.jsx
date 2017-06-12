import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as documentActions from '../../actions/documentActions';
import DocumentForm from '../document/DocumentForm.jsx';

export class ManageDocument extends React.Component {
  componentDidMount() {
    $('select').material_select();
  }

  constructor(props, context) {
    super(props, context);

    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.createDocument = this.createDocument.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);

    this.state = {
      document: Object.assign({}, props.document),
      errors: {},
      saving: false
    };
  }

  componentWillMount() {
    this.props.actions.getAllDocuments();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.document.id !== nextProps.document.id) {
      // Necessary to repopulate the form when document is loaded directly
      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }

  onEditorChange(event) {
    const document = this.state.document;
    document.content = event.target.getContent();
    return { document };
  }

  updateDocumentState(event) {
    const field = event.target.name;
    const authorId = 'ownerId';
    const document = this.state.document;
    document[field] = event.target.value;
    document[authorId] = this.props.authorId;
    return this.setState({ document });
  }

  createDocument(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.createDocument(this.state.document)
    .then(() => this.redirect())
    .catch(() => {
      this.setState({ saving: false });
      toastr.error(this.props.message);
    });
  }

  updateDocument(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.updateDocument(
      this.state.document.id, this.state.document)
    .then(() => this.redirect())
    .catch(() => {
      this.setState({ saving: false });
      toastr.error(this.props.message);
    });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success(this.props.message);
    this.context.router.push('/dashboard');
  }

  render() {
    const isUpdate = this.props.document.id;
    return (
      <div className="section">
        <div className="container">
          <h1>
            {isUpdate ? `Edit ${this.state.document.title}`
              : 'Add new document'}
          </h1>
          <DocumentForm
            document={this.state.document}
            onChange={this.updateDocumentState}
            onEditorChange={this.onEditorChange}
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
  actions: React.PropTypes.object.isRequired,
  document: React.PropTypes.object.isRequired,
  authorId: React.PropTypes.number.isRequired,
  message: React.PropTypes.string
};

// Pull in the React Router context
// so router is available on this.context.router.
ManageDocument.contextTypes = {
  router: React.PropTypes.object
};

const getDocumentById = (documents, id) => {
  const doc = documents.filter(document => document.id === id);
  // Filter returns an array, have to grab the first.
  if (doc) {
    return doc[0];
  }
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const documentId = parseInt(ownProps.params.id, 10);
  const authorId = state.isAuth.loggedInUser.id;
  const message = state.message;

  let document = { id: '', title: '', content: '', viewAccess: '' };

  if (documentId && state.documents.length > 0) {
    document = getDocumentById(state.documents, documentId);
  }

  return {
    document,
    authorId,
    message
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(documentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDocument);

