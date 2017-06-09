import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import SignupForm from './SignupForm.jsx';
import * as userActions from '../../actions/userActions';

class Signup extends Component {
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

  componentWillMount() {
    if (this.props.isAuthenticated) {
      toastr.error('Already logged in');
      this.context.router.push('/dashboard');
    }
  }

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
      toastr.error(
        'Account creation failed. Please check your details and try again.');
    });
  }

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
            {/*<div className="col s12 z-depth-5 card-panel">*/}
            <div className="col s12 z-depth-5 card">
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

Signup.propTypes = {
  user: PropTypes.object,
  message: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  userActions: PropTypes.object.isRequired
};

// Pull in the React Router context
// so router is available on this.context.router.
Signup.contextTypes = {
  router: PropTypes.object
};

/**
 *  map state to props
 *
 * @param {state} state
 * @returns {object}
 */
function mapStateToProps(state) {
  return {
    message: state.message,
    user: state.isAuth.loggedInUser,
    isAuthenticated: state.isAuth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
