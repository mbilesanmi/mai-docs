import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import ReactPaginate from 'react-paginate';
import * as actions from '../../actions/documentActions';
import * as userActions from '../../actions/userActions';
import DocumentListRow from '../document/DocumentListRow.jsx';
import DocumentActionBar from '../document/DocumentActionBar.jsx';
import UserProfile from '../user/UserProfile.jsx';

/**
 * @desc component used to display user's documents
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof Dashboard
   */
  constructor(props, context) {
    super(props, context);

    this.redirectToManageDocument = this.redirectToManageDocument.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

    this.state = {
      documents: [],
      searchResults: [],
      search: '',
      offset: 0
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    this.props.userActions.getOneUser(this.props.loggedInUserID);
    if (this.props.isAuth.isAuthenticated) {
      this.props.actions.getUserDocuments(this.props.loggedInUserID, this.state.offset);
    }
  }

  /**
   * @desc handles the redirecting to the manage documents page
   * @returns {null} returns no value
   */
  redirectToManageDocument() {
    this.context.router.push('/document');
  }

  /**
   * @desc handles change of the search form
   * @param {any} event html event
   * @returns {*} no return value
   */
  onSearchChange(event) {
    this.setState({ search: event.target.value });
    if (event.target.value === '') {
      this.props.actions.getUserDocuments(this.props.loggedInUserID, this.state.offset);
    }
    this.props.actions.search(event.target.value)
    .catch(() => {
      toastr.error(this.props.message);
    });
  }

  /**
   * @desc handles change of the pagination
   * @param {any} data the page number
   * @returns {*} no return value
   */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.props.metaData.pageSize);

    this.setState({ offset }, () => {
      this.props.actions.getUserDocuments(this.props.loggedInUserID, offset);
    });
  }

   /**
   * @desc Renders the Document holder
   * @return {*} render the Document holder
   */
  render() {
    const { documents, searchResults, metaData, user } = this.props;
    let documentsInfo;
    let userProfile;

    if (user && documents) {
      userProfile = <div className="row">
        <div className="col s12 m7 l7">
          <div className="card">
            <div className="card-image" />
            <div className="card-content">
              <h1 className="center">{user.firstname} {user.lastname}</h1>
              <p className="center flow-text">Username: {user.username}</p>
              <p className="center flow-text">Email: {user.email}</p>
            </div>
            <div className=" center card-action">
              <Link to={`/user/${user.id}`} className="waves-effect waves-light btn">Edit Your Profile</Link>
            </div>
          </div>
        </div>
        <div className="col s12 m5 l5">
          <div className="row">
            <div className="card-panel blue z-depth-1 col s10">
              <p className="flow-text">You have {documents.filter(document =>
                document.viewAccess === 'Private'
              ).length} Private documents</p>
            </div>
            <div className="card-panel green z-depth-1 col s10">
              <p className="flow-text">You have {documents.filter(document =>
                document.viewAccess === 'Public'
              ).length} Public documents</p>
            </div>
            <div className="card-panel red z-depth-1 col s10">
              <p className="flow-text">You have {documents.filter(document =>
                document.viewAccess === 'Role'
              ).length} Role documents</p>
            </div>
          </div>
        </div>
      </div>;
    }

    if (!documents || this.props.message === 'no document found') {
      return <div className="section">
        <div className="container">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card-panel teal lighten-3 z-depth-1">
              <div className="row valign-wrapper">
                <div className="col s10">
                  <h3>You have not created any documents</h3>
                  <div className="row">
                    <div className="col l4 m4 s1 offset-l3">
                      <a
                        onClick={this.redirectToManageDocument}
                        className="waves-effect waves-light btn-large green">
                        <i className="material-icons left">add</i>Add New Document
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
    }

    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col l12 m12 s12">
              <hr />
                <h3 className="center">My Dashboard</h3>
              <hr />
              {userProfile}
            </div>
          </div>

          <DocumentActionBar
            redirectToManageDocument={this.redirectToManageDocument}
            onSearchChange={this.onSearchChange}
            onViewAccessChange={this.onViewAccessChange} />

          <div className="row">
            <div className="col s12">
              {documents.map(document =>
                <DocumentListRow
                  loggedInUserID={this.props.loggedInUserID}
                  key={document.id}
                  document={document} />
              )}
            </div>
          </div>

          <div className="center">
            <ReactPaginate previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={<a href="">...</a>}
              breakClassName={'break-me'}
              pageCount={metaData.pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'} />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
Dashboard.propTypes = {
  documents: PropTypes.array,
  searchResults: PropTypes.array,
  search: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object
};

/**
 * @desc Set the contextTypes
 */
Dashboard.contextTypes = {
  router: PropTypes.object
};

/**
 *
 * @param {any} state
 * @returns {boolean} isAuthenticated
 * @returns {*} isAdmin
 */
const mapStateToProps = state => ({
  user: state.users,
  isAuth: state.isAuth,
  message: state.message,
  documents: state.documents.documents,
  metaData: state.documents.metaData,
  loggedInUserID: state.isAuth.loggedInUser.id
});

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
