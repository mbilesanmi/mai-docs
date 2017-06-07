import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentListRow from './DocumentListRow.jsx';

class AllDocuments extends Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToManageDocument = this.redirectToManageDocument.bind(this);

    this.state = {
      documents: [],
    };
  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  redirectToManageDocument() {
    this.context.router.push('/document');
  }

  render() {
    const { documents } = this.props;
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col l6 m6 s12">
              <h1>Sitewide Documents</h1>
            </div>
            <div className="col l5 m5 s12">
              <form>
                <div className="input-field">
                  <input id="search" type="search" required />
                  <label className="label-icon" htmlFor="search">
                    <i className="material-icons">search</i>
                  </label>
                  <i className="material-icons">close</i>
                </div>
              </form>
            </div>
            <div className="col l1 m1 s1">
              <a
                onClick={this.redirectToManageDocument}
                data-position="left"
                data-delay="50"
                data-tooltip="Add document"
                className="btn btn-floating blue tooltipped">
                <i className="material-icons">add</i>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              {documents.filter(document => document.viewAccess !== 'Private')
              .map(document =>
                <DocumentListRow
                  loggedInUserID={this.props.loggedInUserID}
                  key={document.id}
                  document={document}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AllDocuments.propTypes = {
  documents: PropTypes.array,
  loggedInUserID: PropTypes.number
};

// Pull in the React Router context
// so router is available on this.context.router.
AllDocuments.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    documents: state.documents || {},
    loggedInUserID: state.isAuth.loggedInUser.id
  };
}

export default connect(mapStateToProps)(AllDocuments);
