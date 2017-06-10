import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import DocumentListRow from '../document/DocumentListRow.jsx';
import DocumentActionBar from '../document/DocumentActionBar.jsx';
import * as actions from '../../actions/documentActions';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToManageDocument = this.redirectToManageDocument.bind(this);
    this.onViewAccessChange = this.onViewAccessChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      documents: [],
      searchResults: [],
      accessType: null,
      search: ''
    };
  }

  redirectToManageDocument() {
    this.context.router.push('/document');
  }

  onViewAccessChange(event) {
    this.setState({ accessType: event.target.value });
  }

  onSearchChange(event) {
    this.setState({ search: event.target.value });
    this.props.actions.search(event.target.value);
  }

  render() {
    const { documents } = this.props;
    const { searchResults } = this.props;

    let filteredDocuments;
    if (this.state.search !== '') {
      filteredDocuments = searchResults.filter(document =>
        document.ownerId === this.props.loggedInUserID);
    } else if (this.state.accessType === null
      || this.state.accessType === 'All') {
      filteredDocuments = documents.filter(document =>
        document.ownerId === this.props.loggedInUserID);
    } else {
      filteredDocuments = documents.filter(document =>
        document.ownerId === this.props.loggedInUserID).filter(document =>
          document.viewAccess === this.state.accessType
        );
    }
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col l12 m12 s12">
              <hr />
                <h1 className="center">My Documents</h1>
              <hr />
            </div>
          </div>

          <DocumentActionBar
            redirectToManageDocument={this.redirectToManageDocument}
            onSearchChange={this.onSearchChange}
            onViewAccessChange={this.onViewAccessChange} />

          <div className="row">
            <div className="col s12">
              {filteredDocuments.map(document =>
                <DocumentListRow
                  loggedInUserID={this.props.loggedInUserID}
                  key={document.id}
                  document={document} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  documents: PropTypes.array,
  searchResults: PropTypes.array,
  loggedInUserID: PropTypes.number,
  search: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object
};

// Pull in the React Router context
// so router is available on this.context.router.
Dashboard.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = state => ({
  message: state.message,
  searchResults: state.searchResults.documents || [],
  documents: state.documents || [],
  loggedInUserID: state.isAuth.loggedInUser.id
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
