import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import UserListRow from './UserListRow.jsx';
import UserActionBar from './UserActionBar.jsx';
import * as actions from '../../actions/userActions';

class AllUsers extends Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToManageUser = this.redirectToManageUser.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);

    this.state = {
      users: [],
      searchResults: [],
      roleType: '',
      search: '',
      offset: 0
    };
  }

  componentWillMount() {
    if (this.props.isAuth.isAuthenticated) {
      this.props.actions.getAllUsers(this.state.offset);
    }
  }

  redirectToManageUser() {
    this.context.router.push('/user');
  }

  onRoleChange(event) {
    this.setState({ roleType: event.target.value });
  }

  clearSearch(event) {
    this.setState({ search: '' });
  }

  onSearchChange(event) {
    this.setState({ search: event.target.value });
    this.props.actions.search(event.target.value)
    .catch(() => toastr.error(this.props.message));
  }

  render() {
    const { users, searchResults, metaData } = this.props;
    // const { searchResults } = this.props;

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

AllUsers.propTypes = {
  users: PropTypes.array,
  searchResults: PropTypes.array,
  loggedInUserID: PropTypes.number,
  search: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object
};

// Pull in the React Router context
// so router is available on this.context.router.
AllUsers.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = state => ({
  isAuth: state.isAuth,
  message: state.message,
  searchResults: state.searchResults.users,
  users: state.users.users,
  metaData: state.users.metaData,
  loggedInUserID: state.isAuth.loggedInUser.id
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
