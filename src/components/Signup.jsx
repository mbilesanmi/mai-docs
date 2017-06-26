import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import * as userActions from '../actions/userActions';

/**
 * Home page view
 * @class Home
 * @extends {React.Component}
 */
class Signup extends Component {
  /**
   * Creates an instance of Signup.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof Signup
   */
  constructor(props, context) {
    super(props, context);

    this.updateFormState = this.updateFormState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isPassword = this.isPassword.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);

    this.state = {
      user: Object.assign({}, props.user),
      isLoading: false,
      wrongPassword: false
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      toastr.error('Already logged in');
      this.context.router.push('/dashboard');
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
   * @desc handles signup form actions
   * @param {any} event html event
   * @returns {*} no return value
   */
  onSubmit(event) {
    event.preventDefault();
    if (!this.state.wrongPassword) {
      this.setState({
        isLoading: true
      });
      this.props.userActions.signup(this.state.user)
      .then(() => {
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
   * @desc Upon successful login, redirect to Dashboard
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
   * @memberOf Login
   */
  render() {
    return (
      <div className="signupPage login-container login-cover">
        <div className="page-container">
          <div className="page-content">
            <div className="content-wrapper">
              <form className="form-validate registration-form"
                onSubmit={this.onSubmit}>

                <div className="row">
                  <div className="col-lg-6 col-lg-offset-3">
                    <div className="panel">
                      <div className="panel-body">
                        <div className="text-center">
                          <div className="icon-object border-success text-success">
                            <i className="icon-plus3"></i>
                          </div>
                          <h5 className="content-group-lg">Create account
                            <small className="display-block">
                              All fields are required
                            </small>
                          </h5>
                        </div>

                        <div className="form-group has-feedback">
                          <span>Firstname</span>
                          <input
                            type="text"
                            name="firstname"
                            className="form-control"
                            onChange={this.updateFormState}
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
                            placeholder="Lastname"
                            required="required" />
                        </div>

                        <div className="form-group has-feedback">
                          <span>Username</span>
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            onChange={this.updateFormState}
                            placeholder="Choose username"
                            required="required" />
                        </div>

                        <div className="form-group has-feedback">
                          <span>Email</span>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={this.updateFormState}
                            placeholder="Your email"
                            required="required" />
                        </div>

                        <div className="form-group has-feedback">
                          <span>Password</span>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={this.updateFormState}
                            placeholder="Create password"
                            required="required" />
                        </div>

                        <div className="form-group has-feedback">
                          <span>Confirm Password</span>
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            onBlur={this.isPassword}
                            placeholder="Repeat password"
                            required="required" />
                        </div>

                        <div className="clearfix">
                          <button
                            type="submit"
                            name="signup"
                            className="btn bg-teal btn-labeled btn-block content-group">
                            Create account
                          </button>
                        </div>

                        <div className="content-divider text-muted form-group">
                          <span>Have an account?</span>
                        </div>
                        <Link
                          to="/login"
                          className="btn btn-default btn-block content-group sm-6">
                          Login
                        </Link>
                        <span className="help-block text-center no-margin">
                          By continuing, you're confirming that you've read our
                          <a> Terms &amp; Conditions </a>
                          and <a>Cookie Policy</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
Signup.PropTypes = {
  message: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  userActions: PropTypes.object.isRequired
};

/**
 * @desc Set the contextTypes
 */
Signup.contextTypes = {
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
  isAuthenticated: state.authenticated.isAuth
});

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
