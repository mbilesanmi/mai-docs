import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import * as userActions from '../../actions/userActions';

class UserTasks extends Component {
  constructor(props, context) {
    super(props, context);

    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(event) {
    event.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to undo this!!!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, GO AHEAD!',
      timer: 5000,
      closeOnConfirm: false
    }, (isConfirm) => {
      if (isConfirm) {
        this.props.actions.deleteUser(this.props.userId)
        .then(() =>
          swal('Deleted!', 'The selected profile has been deleted.', 'success')
        )
        .catch(() =>
          swal('Cancelled', 'Unable to delete user profile', 'error')
        );
      } else {
        swal('Cancelled', 'The user profile is safe :)', 'error');
      }
    });
  }
  render() {
    return (
      <span>
        <Link
          to={`/user/view/${this.props.userId}`}
          className="waves-effect waves-light btn blue">View
        </Link>
        &nbsp;&nbsp;
        <a className="waves-effect waves-light btn red"
          onClick={this.deleteUser}>Delete
        </a>
      </span>
    );
  }
}

UserTasks.propTypes = {
  userId: PropTypes.number,
  actions: PropTypes.object.isRequired
};

// Pull in the React Router context
// so router is available on this.context.router.
UserTasks.contextTypes = {
  router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(UserTasks);
