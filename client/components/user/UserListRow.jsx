import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import UserTasks from './UserTasks.jsx';

/**
 * @desc component used to display the list of users
 */
const UserListRow = ({ user, roles }) =>
  <div className="col s12 m6 l4">
    <div className="card medium hoverable z-depth-5">
      <div className="card-content">
        <h4>{user.firstname} {user.lastname}</h4>
        <hr />
        <div className="col s12 light">
          <b>Email:</b> {user.email}
        </div>
        <div className="col s12 light">
          <b>Username:</b> {user.username}
        </div>
        <div className="col s12 light">
          <b>Role:</b> {roles.filter(role =>
            role.id === user.roleId
          ).map(role =>
            <span key={role.id}>
              {role.title}
            </span>
          )}
        </div>
        <div className="col s12 light">
          <b>Joined on:</b> {user.createdAt.slice(0, 10)}
        </div>
      </div>
      <div className="card-action">
        <UserTasks userId={user.id} />
      </div>
    </div>
  </div>
;

/**
 * @desc Set the PropTypes
 */
UserListRow.propTypes = {
  user: PropTypes.object.isRequired,
  roles: PropTypes.array
};

/**
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns {*} props
 */
const mapStateToProps = state => ({
  roles: state.roles
});

export default connect(mapStateToProps)(UserListRow);
