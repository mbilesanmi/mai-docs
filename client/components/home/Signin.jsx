import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import SigninForm from './SigninForm.jsx';
import * as userActions from '../../actions/userActions';

class Signin extends Component {
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
    this.props.userActions.login(this.state.user)
    .then(() => {
      this.setState({ isLoading: false });
      toastr.success('Logged in Successfully');
      this.context.router.push('/dashboard');
    })
    .catch(() => {
      this.setState({ isLoading: false });
      toastr.error('Unable to login user, please try again');
    });
  }

  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user });
  }

  render() {
    return (
      <div>
        <h1>Mai Docs</h1>
        <p>Mai Document manager</p>
        <div className="container">
          <div className="row">
            <SigninForm
              user={this.state.user}
              onChange={this.updateUserState}
              onSubmit={this.onSubmit}
              loading={this.state.isLoading}
              errors={this.state.errors}
            />
          </div>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  userActions: PropTypes.object.isRequired
};

// Pull in the React Router context
// so router is available on this.context.router.
Signin.contextTypes = {
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
    user: state.isAuth.loggedInUser,
    isAuthenticated: state.isAuth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
