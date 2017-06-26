import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import * as userActions from '../../actions/userActions.js';

/**
 * UpdateProfile page view
 * @class UpdateProfile
 * @extends {React.Component}
 */
class UpdateProfile extends Component {
  /**
   * Creates an instance of UpdateProfile.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof UpdateProfile
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        firstname: props.authUser.firstname,
        lastname: props.authUser.lastname
      },
      isLoading: false,
      updatePassword: false,
      wrongPassword: false
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isPassword = this.isPassword.bind(this);
    this.changePasswordClick = this.changePasswordClick.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (this.props.isAuthenticated.isAuth) {
      this.props.userActions.getOneUser(this.props.isAuthenticated.user.id);
    }
  }

  /**
   * @desc handles the updating of the component to receive props
   * @param {*} nextProps next Props of the component
   * @returns {null} returns no value
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.authUser.id !== nextProps.authUser.id) {
      // Necessary to repopulate the form when document is loaded directly
      this.setState({ user: {
        firstname: nextProps.authUser.firstname,
        lastname: nextProps.authUser.lastname
      } });
    }
  }

  /**
   * @desc Set the state of password to enable changing the password
   * @param {any} event html form element event
   * @returns {null} returns no value
   */
  changePasswordClick(event) {
    const changeValue = event.target.checked;

    if (changeValue) {
      this.setState({ updatePassword: true });
    } else {
      this.setState({ updatePassword: false });
    }
  }

  /**
   * Checks if the password and confirm password match.
   * @param {any} event html form event
   * @returns {null} returns no value
   */
  isPassword(event) {
    if (event.target.value !== this.state.user.password) {
      this.setState({
        wrongPassword: true
      });
    } else {
      this.setState({
        wrongPassword: false
      });
    }
  }

  /**
   * @desc handles UpdateProfile form actions
   * @param {any} event html event
   * @returns {*} no return value
   */
  onSubmit(event) {
    event.preventDefault();
    if ((this.state.updatePassword && !this.state.wrongPassword) || !this.state.updatePassword) {
      this.setState({
        isLoading: true
      });
      console.log('skhudbkjfd', this.state.user);
      this.props.userActions.updateProfile(this.state.user, this.props.isAuthenticated.user.id)
      .then(() => {
        console.log('skhudbkjfd', this.props.authUser);
        this.redirectToDashboard();
      })
      .catch(() => {
        this.setState({ isLoading: false });
        toastr.error(this.props.message);
      });
    } else {
      toastr.error('Passwords do not match');
    }
  }

  /**
   * @desc Upon successful profile update, redirect to Dashboard
   * @returns {null} returns no value
   */
  redirectToDashboard() {
    this.setState({ isLoading: false });
    toastr.success(this.props.message);
    this.context.router.push('/dashboard');
  }

  /**
   * @desc handles form element changes
   * @param {any} event html event
   * @returns {*} no return value
   */
  updateFormState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user });
  }

  /**
   * Renders the view of the component
   * @returns {Object} react component to render
   * @memberOf UpdateProfile
   */
  render() {
    let passwordFields;
    const userData = this.state.user;

    if (this.state.updatePassword) {
      passwordFields = <div>
        <div className="form-group has-feedback">
          <span>Password</span>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={this.updateFormState}
            placeholder="Password"
            required="required" />
        </div>
        <div className="form-group has-feedback">
          <span>Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            onChange={this.isPassword}
            placeholder="confirmPassword"
            required="required" />
        </div>
      </div>;
    } else {
      passwordFields = null;
    }
    return (
      <div className="container">
        <div className="section">
          <form className="form-validate registration-form"
            onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col s6 offset-s3">
                <div className="card-panel">
                  <div className="text-center">
                    <div className="icon-object border-success text-success">
                      <i className="icon-plus3"></i>
                    </div>
                    <h5 className="center flow-text">Update your account</h5>
                    <div className="center red-text">
                      <small>
                        All fields are required
                      </small>
                    </div>
                    <div className="divider"></div>
                  </div>

                  <div className="form-group has-feedback">
                    <span>Firstname</span>
                    <input
                      type="text"
                      name="firstname"
                      className="form-control"
                      onChange={this.updateFormState}
                      value={userData.firstname ? userData.firstname : ''}
                      placeholder="Firstname"
                      required="required" />
                  </div>
                  <div className="form-group has-feedback">
                    <span>Lastname</span>
                    <input
                      type="text"
                      name="lastname"
                      className="form-control"
                      onChange={this.updateFormState}
                      value={userData.lastname ? userData.lastname : ''}
                      placeholder="Lastname"
                      required="required" />
                  </div>

                  <div className="switch">
                    Toggle to change you password: &nbsp;
                    <label>
                      Off
                      <input type="checkbox" value="off" onClick={this.changePasswordClick} />
                      <span className="lever"></span>
                      On
                    </label>
                  </div>
                  {passwordFields}
                  <div className="clearfix">
                    <button
                      type="submit"
                      name="updateProfile"
                      className="btn bg-teal btn-labeled btn-block content-group">
                      {this.state.isLoading? 'Saving' : 'Update Profile'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
UpdateProfile.PropTypes = {
  message: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  userActions: PropTypes.object.isRequired
};

/**
 * @desc Set the contextTypes
 */
UpdateProfile.contextTypes = {
  router: PropTypes.object
};

/**
 *  map state to props
 *
 * @param {state} state
 * @returns {*} props
 */
const mapStateToProps = state => ({
  message: state.message,
  isAuthenticated: state.authenticated,
  authUser: state.users || {}
});

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
