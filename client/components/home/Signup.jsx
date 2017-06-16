import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import SignupForm from './SignupForm.jsx';
import * as userActions from '../../actions/userActions';

/**
 * @desc component used to display the signup component
 * @class Signup
 * @extends {Component}
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

    this.onSubmit = this.onSubmit.bind(this);
    this.updateUserState = this.updateUserState.bind(this);

    this.state = {
      user: Object.assign({}, props.user),
      errors: {},
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
      errors: {},
      isLoading: true
    });
    this.props.userActions.createUser(this.state.user)
    .then(() => {
      this.setState({ isLoading: false });
      toastr.success(this.props.message);
      this.context.router.push('/dashboard');
    })
    .catch(() => {
      this.setState({ isLoading: false });
      toastr.error(this.props.message);
    });
  }

  /**
   * @desc handles form element changes
   * @param {any} event html event
   * @returns {*} no return value
   */
  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user });
  }

  /**
   * React Render
   * @return {object} html
   */
  render() {
    return (
      <div>
        <h1 className="center">Mai Docs</h1>
        <p className="center">Mai Document manager</p>
        <div className="container">
          <div className="row">
            <div className="grey lighten-3 col s12 z-depth-5 card">
              <div className="card-image">
                <h2 className="center">SIGNUP</h2>
              </div>

              <SignupForm
                user={this.state.user}
                onChange={this.updateUserState}
                onSubmit={this.onSubmit}
                loading={this.state.isLoading}
                errors={this.state.errors} />
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
Signup.propTypes = {
  user: PropTypes.object,
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
 * @returns {object} props
 */
function mapStateToProps(state) {
  return {
    message: state.message,
    user: state.isAuth.loggedInUser,
    isAuthenticated: state.isAuth.isAuthenticated
  };
}

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
