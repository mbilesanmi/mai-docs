import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentListRow from '../document/DocumentListRow.jsx';
import DocumentActionBar from '../document/DocumentActionBar.jsx';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToManageDocument = this.redirectToManageDocument.bind(this);
    this.onViewAccessChange = this.onViewAccessChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      documents: [],
      accessType: null
    };
  }

  redirectToManageDocument() {
    this.context.router.push('/document');
  }

  onViewAccessChange(event) {
    this.setState({ accessType: event.target.value });
  }

  onSearchChange(event) {
    console.log('seaching', event.target.value);
  }

  render() {
    const { documents } = this.props;

    let filteredDocuments;
    if (this.state.accessType === null || this.state.accessType === 'All') {
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
            <div className="col l6 m6 s12">
              <h1>My Documents</h1>
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
  loggedInUserID: PropTypes.number
};

// Pull in the React Router context
// so router is available on this.context.router.
Dashboard.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    documents: state.documents || {},
    loggedInUserID: state.isAuth.loggedInUser.id
  };
}

export default connect(mapStateToProps)(Dashboard);
