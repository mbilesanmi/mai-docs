import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as userActions from '../../actions/userActions';

class EditUserProfile extends Component {
  /**
   * Creates an instance of ManageDocuments.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof ManageDocuments
   */
  constructor(props, context) {
    super(props, context);

    this.updateUserState = this.updateUserState.bind(this);
    // this.updateUser = this.updateUser.bind(this);

    this.state = {
      user: Object.assign({}, props.user),
      errors: {},
      saving: false
    };
  }

  componentWillMount() {
    if (this.props.userId) {
      this.props.userActions.getOneUser(this.props.userId);
    }
  }

  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;

    user[field] = event.target.value;
    user.id = this.props.userId;
    return this.setState({ user });
  }

  render() {
    console.log('user upda', this.state.user);
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-image" />
              <div className="card-content">
                <h1 className="center">Edit User profile</h1>
                <form>
                  <div className="row">
                    <div className="col s6 offset-s3">
                      <p className="flow-text">Firstname:</p>
                      <input
                        name="firstname"
                        type="text"
                        placeholder="Your firstname here"
                        required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s6 offset-s3">
                      <p className="flow-text">Lastname:</p>
                      <input
                        name="lastname"
                        type="text"
                        placeholder="Your lastname here"
                        required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s6 offset-s3">
                      <p className="flow-text">Username:</p>
                      <input
                        name="username"
                        type="text"
                        placeholder="Your username here"
                        required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s6 offset-s3">
                      <p className="flow-text">Email:</p>
                      <input
                        name="username"
                        type="email"
                        placeholder="Your email here"
                        required />
                    </div>
                  </div>

                  <div className="card-action">
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="saveProfile"
                          type="submit"
                          className=
                            "btn waves-effect waves-light col s2 offset-s5 teal darken-1" />
                      </div>
                    </div>
                  </div>

                </form>
              </div>
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
EditUserProfile.propTypes = {
  userActions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  message: PropTypes.string
};

/**
 * @desc Set the contextTypes
 */
EditUserProfile.contextTypes = {
  router: PropTypes.object
};

/**
 *  map state to props
 *
 * @param {state} state
 * @returns {object} props
 */
function mapStateToProps(state, ownProps) {
  const userId = parseInt(ownProps.params.id, 10);
  const user = state.users;

  return {
    user,
    userId,
    message: state.message,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile);
