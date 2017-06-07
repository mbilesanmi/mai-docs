import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentListRow from '../document/DocumentListRow.jsx';

class Dashboard extends Component {
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
              <h1>My Documents</h1>
            </div>
          </div>
          <div className="row">
            <div className="col l3 m3 s1">
              <a
                onClick={this.redirectToManageDocument}
                data-position="left"
                data-delay="50"
                data-tooltip="Add document"
                className="btn btn-floating blue tooltipped">
                <i className="material-icons">add</i>
              </a>
            </div>

            <div className="col l5 m5 s12">
              <form>
                <div className="input-field">
                  <input id="search" type="search" placeholder="Search within your own documents" />
                  <label className="label-icon" htmlFor="search">
                    <i className="material-icons">search</i>
                  </label>
                  <i className="material-icons">close</i>
                </div>
              </form>
            </div>

            <div className="input-field col l4 m4 s12">
              <form action="#">
                <h6>Filter by View Access permission</h6>
                <input
                  className="with-gap"
                  name="viewAccess"
                  type="radio"
                  id="Public" />&nbsp;
                <label htmlFor="Public">Public</label>
                <input
                  className="with-gap"
                  name="viewAccess"
                  type="radio"
                  id="Private" />&nbsp;
                <label htmlFor="Private">Private</label>
                <input
                  className="with-gap"
                  name="viewAccess"
                  type="radio"
                  id="Role" />&nbsp;
                <label htmlFor="Role">Role</label>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              {documents.filter(document => document.ownerId === this.props.loggedInUserID)
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



/*import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import DocumentList from '../document/DocumentList.jsx';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    // this.updateUserState = this.updateUserState.bind(this);

    this.state = {
      documents: [],
      // user: Object.assign({}, props.user),
      // errors: {},
      // isLoading: false
    };
  }

  componentWillMount() {
    this.props.actions.getMyDocuments(this.props.ownerID);
  }

  render() {
    const { documents } = this.props;
    const currentUrlPath = this.props.location.pathname;
    console.log('props1', currentUrlPath);
    return (
      <div className="section">
        <div className="container">
          {/*<DocumentTasks />*/
//           <h1>Dashboard</h1>
//           <h3>My Documents</h3>
//           <DocumentList currentUrlPath={currentUrlPath} documents={documents} />
//         </div>
//       </div>
//     );
//   }
// }

// Dashboard.propTypes = {
//   actions: PropTypes.object.isRequired,
//   ownerID: PropTypes.number.isRequired,
//   documents: PropTypes.array.isRequired,
//   location: PropTypes.object
// };

// function mapStateToProps(state) {
//   return {
//     ownerID: state.isAuth.loggedInUser.id,
//     documents: state.isAuth.loggedInUserDocuments || []
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(documentActions, dispatch)
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);*/
