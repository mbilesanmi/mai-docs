import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserListRow from './UserListRow.jsx';
// import DocumentActionBar from './DocumentActionBar.jsx';
import * as actions from '../../actions/userActions';

class AllUsers extends Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToManageUser = this.redirectToManageUser.bind(this);
    // this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      users: [],
      searchResults: [],
      search: ''
    };
  }

  redirectToManageUser() {
    this.context.router.push('/user');
  }

  // onSearchChange(event) {
  //   this.setState({ search: event.target.value });
  //   this.props.actions.search(event.target.value);
  // }

  render() {
    const { users } = this.props;
    // const { searchResults } = this.props;

    // let filteredUsers;
    // if (this.state.search !== '') {
    //   filteredUsers = searchResults.filter(user =>
    //     user.roleId !== 1);
    // } else if (this.state.accessType === null
    //   || this.state.accessType === 'All') {
    //   filteredUsers = documents.filter(document =>
    //     document.viewAccess !== 'Private');
    // } else {
    //   filteredUsers = users.filter(user =>
    //     user.viewAccess !== 'Private').filter(user =>
    //       user.viewAccess === this.state.accessType
    //     );
    // }
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col l6 m6 s12">
              <h1>All Users</h1>
            </div>
          </div>

          {/*<DocumentActionBar
            redirectToManageDocument={this.redirectToManageDocument}
            onViewAccessChange={this.onViewAccessChange}
            onSearchChange={this.onSearchChange}
            sitewide="sitewide" />*/}

          <div className="row">
            <div className="col s12">
              {users.map(user =>
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
}

AllUsers.propTypes = {
  users: PropTypes.array,
  // searchResults: PropTypes.array,
  loggedInUserID: PropTypes.number,
  // search: PropTypes.string,
  actions: PropTypes.object
};

// Pull in the React Router context
// so router is available on this.context.router.
AllUsers.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = state => ({
  // searchResults: state.searchResults.documents || [],
  users: state.users || {},
  loggedInUserID: state.isAuth.loggedInUser.id
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
