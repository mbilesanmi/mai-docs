import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ViewUser extends Component {
  render() {
    const { roles, users } = this.props;

    return (
      <div className="container">
        {users.filter(user => user.id === this.props.userId)
        .map(user =>
          <span key="user.id">
            <h1>name: {user.firstname} {user.lastname}</h1>
            <div>
              Date Joined: {user.createdAt.slice(0, 10)}<br />
              Role: {roles.filter(role =>
                role.id === user.roleId
              ).map(role =>
                <span key={role.id}>
                  {role.title}
                </span>
              )}
            </div>
            <span>
              Email: {user.email}
            </span>
            <span>
              Username: {user.username}
            </span>
          </span>
        )}
      </div>
    );
  }
}

ViewUser.propTypes = {
  users: PropTypes.array.isRequired,
  userId: PropTypes.number,
  message: PropTypes.string,
  roles: PropTypes.array
};

// Pull in the React Router context
// so router is available on this.context.router.
ViewUser.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
  roles: state.roles,
  userId: parseInt(ownProps.params.id, 10),
  users: state.users
});

export default connect(mapStateToProps)(ViewUser);
