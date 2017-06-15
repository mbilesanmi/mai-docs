import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/userActions.js';

/**
 * @desc component used to display the user profile
 * @class UserProfile
 * @extends {Component}
 */
class UserProfile extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    this.props.actions.getOneUser(this.props.userId);
  }

  /**
   * @desc Renders the user profile
   * @return {*} html
   */
  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-image" />
              <div className="card-content">
                <h1 className="center">{user.firstname} {user.lastname}</h1>
                <p className="center flow-text">Username: {user.username}</p>
                <p className="center flow-text">Email: {user.email}</p>
              </div>
              <div className=" center card-action">
                <Link to={`/user/view/${user.id}`} className="waves-effect waves-light btn">Edit Your Profile</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns {*} props
 */
const mapStateToProps = (state, ownProps) => {
  const userId = parseInt(ownProps.params.id, 10) || this.props.userId;
  const user = state.users;

  return (
    user,
    userId
  );
};

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
