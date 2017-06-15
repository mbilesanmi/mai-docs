import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import toastr from 'toastr';
// import UserListRow from './UserListRow.jsx';
// import UserActionBar from './UserActionBar.jsx';
// import * as actions from '../../actions/userActions';

/**
 * @desc component used to display all users
 * @class AllUsers
 * @extends {Component}
 */
class UserProfile extends Component {
  /**
   * Creates an instance of UserProfile.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof UserProfile
   */
  constructor(props, context) {
    super(props, context);

    this.redirectToManageUser = this.redirectToManageUser.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      users: [],
      searchResults: [],
      roleType: '',
      search: '',
      offset: 0
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (this.props.isAuth.isAuthenticated) {
      this.props.actions.getUserProfile(this.state.offset);
    }
  }

  /**
   * @desc handles the redirecting to the manage documents page
   * @returns {null} returns no value
   */
  redirectToManageUser() {
    this.context.router.push('/user');
  }

  /**
   * @desc handles change of the search form
   * @param {any} event html event
   * @returns {*} no return value
   */
  onSearchChange(event) {
    this.setState({ search: event.target.value });
    this.props.actions.search(event.target.value)
    .catch(() => toastr.error(this.props.message));
  }

  /**
   * React Render
   * @return {object} html
   */
  render() {
    const { users, searchResults, metaData } = this.props;

    if (users) {
      let filteredUsers;
      if (this.state.search !== '') {
        filteredUsers = searchResults;
      } else if (this.state.roleType === ''
        || this.state.roleType === 'All') {
        filteredUsers = users;
      } else {
        filteredUsers = users.filter(user =>
          user.roleId === parseInt(this.state.roleType, 10)
        );
      }
      return (
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col l12 m12 s12">
                <hr />
                  <h1 className="center">All Users</h1>
                <hr />
              </div>
            </div>

            <UserActionBar
              clearSearch={this.clearSearch}
              onRoleChange ={this.onRoleChange}
              onSearchChange={this.onSearchChange} />

            <div className="row">
              <div className="col s12">
                {filteredUsers.map(user =>
                  <UserListRow
                    loggedInUserID={this.props.loggedInUserID}
                    key={user.id}
                    user={user} />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

/**
 * @desc Set the PropTypes
 */
UserProfile.propTypes = {
  users: PropTypes.array,
  searchResults: PropTypes.array,
  loggedInUserID: PropTypes.number,
  search: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object
};

/**
 * @desc Set the contextTypes
 */
UserProfile.contextTypes = {
  router: PropTypes.object
};

/**
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns {*} props
 */
const mapStateToProps = state => ({
  isAuth: state.isAuth,
  message: state.message,
  searchResults: state.searchResults.users,
  users: state.users.users,
  metaData: state.users.metaData,
  loggedInUserID: state.isAuth.loggedInUser.id
});

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
