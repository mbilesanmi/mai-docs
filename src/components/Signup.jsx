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
export class Signup extends Component {
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
      <div className="section">
        <div className="container">
          <div className="card">
            <form className="col s12" id="signupForm" onSubmit={this.onSubmit}>
              <div className="card-content">
                <span className="card-title row">
                  <div className="icon-object border-success text-success">
                    <i className="icon-plus3"></i>
                  </div>
                  <h5 className="center">
                    Create account
                  </h5>
                  <small className="col s12 m6 l3 offset-l5 offset-m3">
                    All fields are required
                  </small>
                </span>

                <div className="divider" />
                <div className="row">
                  <div className="input-field col s6 offset-s3">
                    <span>Firstname</span>
                    <input
                      type="text"
                      name="firstname"
                      onChange={this.updateFormState}
                      placeholder="Firstname"
                      required="required" />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6 offset-s3">
                    <span>Lastname</span>
                    <input
                      type="text"
                      name="lastname"
                      onChange={this.updateFormState}
                      placeholder="Lastname"
                      required="required" />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6 offset-s3">
                    <span>Username</span>
                    <input
                      type="text"
                      name="username"
                      onChange={this.updateFormState}
                      placeholder="Choose username"
                      required="required" />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6 offset-s3">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      onChange={this.updateFormState}
                      placeholder="Your email"
                      required="required" />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6 offset-s3">
                    <span>Password</span>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={this.updateFormState}
                      placeholder="Create password"
                      required="required" />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6 offset-s3">
                    <span>Confirm Password</span>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      onBlur={this.isPassword}
                      placeholder="Repeat password"
                      required="required" />
                  </div>
                </div>
              </div>

              <div className="card-action">
                <div className="row">
                  <div className="clearfix">
                    <button
                      type="submit"
                      name="signup"
                      className="btn btn-success col s2 offset-s5">
                      {this.state.isLoading ? 'Processing...' : 'Create account'}
                    </button>
                  </div>
                  <div className="clearfix"></div>
                  <div>
                    <p className="center have-account">Have an account?</p>
                    <Link
                      to="/login"
                      className="btn grey lighten-3 black-text col s2 offset-s5">
                      Login
                    </Link>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </form>
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
