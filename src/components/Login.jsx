import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import * as userActions from '../actions/userActions';

/**
 * Login page view
 * @class Login
 * @extends {React.Component}
 */
export class Login extends Component {
  /**
   * Creates an instance of Login.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof Login
   */
  constructor(props, context) {
    super(props, context);

    this.updateFormState = this.updateFormState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);

    this.state = {
      user: Object.assign({}, props.user),
      isLoading: false
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
   * @desc handles signup form actions
   * @param {any} event html event
   * @returns {*} no return value
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    this.props.userActions.login(this.state.user)
    .then(() => {
      this.redirectToDashboard();
    })
    .catch(() => {
      this.setState({ isLoading: false });
      toastr.error(this.props.message);
    });
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
          <div className="row">
            <form className="card col s8 offset-s2" id="loginForm" onSubmit={this.onSubmit}>
              <div className="card-content">
                <span className="card-title">
                  <h5 className="center">
                    Login to your account
                  </h5>
                </span>
                <div className="divider" />
                <div className="row">
                  <div className="input-field col s8 offset-s2">
                    <input
                      placeholder="Username/Email"
                      id="loginId"
                      type="text"
                      name="loginId"
                      onChange={this.updateFormState}
                      className="validate"
                      required="required" />
                    <label htmlFor="first_name">Username/Email</label>
                  </div>
                  <div className="clearfix"></div>
                  <div className="input-field col s8 offset-s2">
                    <input
                      placeholder="Password"
                      id="password"
                      type="password"
                      name="password"
                      onChange={this.updateFormState}
                      className="validate"
                      required="required" />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <div className="row">
                  <button
                    type="submit"
                    name="login"
                    className="btn btn-success col s2 offset-s5">
                    {this.state.isLoading ? 'Processing...' : 'Login'}
                  </button>
                  <div className="clearfix"></div>
                  <div>
                    <p className="center have-account">Don't have an account?</p>
                    <Link
                      to="/signup"
                      className="btn grey lighten-3 black-text col s2 offset-s5">
                      Sign up
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
Login.PropTypes = {
  message: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  userActions: PropTypes.object.isRequired
};

/**
 * @desc Set the contextTypes
 */
Login.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
