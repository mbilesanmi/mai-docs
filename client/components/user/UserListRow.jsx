import React, { PropTypes } from 'react';
import UserTasks from './UserTasks.jsx';

const UserListRow = ({ user }) => (
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
        </div>
        <div className="card-action">
          <UserTasks userId={user.id} />
        </div>
      </div>
    </div>
  );

UserListRow.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserListRow;
