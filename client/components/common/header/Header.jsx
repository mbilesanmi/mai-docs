import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import toastr from 'toastr';
import MainMenu from './MainMenu.jsx';
import { logout } from '../../../actions/userActions';

/**
 * @desc component used to display the site header
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  /**
   * Creates an instance of Header.
   * @param {any} props property of component
   * @returns {*} no return value
   * @memberof Header
   */
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  /**
   * @desc handles the rendering of the selecet box.
   * @returns {null} returns no value
   */
  static componentWillMount() {
    $('.dropdown-button').dropdown();
  }

  /**
   * @desc handles change of the user logout
   * @param {any} event html event
   * @returns {*} no return value
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
    toastr.info('You are now logged out');
    this.context.router.push('/');
  }

   /**
   * React Render
   * @return {object} html
   */
  render() {
    const loggedIn = this.props.loggedIn;
    let isAdmin;
    if (loggedIn) {
      isAdmin = this.props.isAdmin.roleId;
    } else {
      isAdmin = 0;
    }
    return (
      <nav className="nav-wrapper teal" role="navigation">
        <IndexLink
          to="/dashboard"
          classID="logo-container"
          className="brand-logo">
          Mai Docs
        </IndexLink>
        <MainMenu
          loggedIn={loggedIn}
          isAdmin={isAdmin}
          logout={this.logout} />
      </nav>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  isAdmin: PropTypes.object
};

/**
 * @desc Set the contextTypes
 */
Header.contextTypes = {
  router: PropTypes.object
};

/**
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns {*} props
 */
const mapStateToProps = state => ({
  loggedIn: state.isAuth.isAuthenticated,
  isAdmin: state.isAuth.loggedInUser
});

export default connect(mapStateToProps, { logout })(Header);
