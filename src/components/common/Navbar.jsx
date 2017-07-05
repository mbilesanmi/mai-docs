import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import toastr from 'toastr';
import { logout } from '../../actions/userActions';

/**
 * Component to persist across all routes
 * @class Navbar
 * @extends {Component}
 */
export class Navbar extends Component {
  /**
   * Creates an instance of Header.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof Header
   */
  constructor(props, context) {
    super(props, context);

    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    // $('.button-collapse').sideNav();
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
    this.context.router.push('/login');
  }

  /**
   * Renders the view of the component
   * @returns {Object} react component to render
   * @memberOf Navbar
   */
  render() {
    let isAdmin;
    let userIsAuth;
    if (this.props.authUser.roleId === 1) {
      isAdmin = true;
    }
    if (this.props.isAuth) {
      userIsAuth = true;
    }
    return (
      <nav className="nav-extended brown">
        <div className="nav-wrapper">
          <div className="container">
            <IndexLink
              to="/dashboard"
              className="navbar-brand"
              className="brand-logo">
              Mai Docs
            </IndexLink>
            <a href="#" data-activates="mobile-demo" className="button-collapse">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </a>

            <ul className="right hide-on-med-and-down">
              { userIsAuth
              ? <span>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/documents">All Documents</Link></li>
              </span>
              : '' }
              {isAdmin ? <li><Link to="/users">Manage Users</Link></li> : ''}
              { userIsAuth
              ? <li>
                  <Link activeClassName="active" id="logout"
                    to="/logout" onClick={this.logout}>
                Logout</Link>
                </li>
                : <span>
                  <li><Link to="/login">Login</Link></li>
                  <li id="signup"><Link to="/signup">Signup</Link></li>
                </span>
              }
            </ul>

            <ul className="side-nav" id="mobile-demo">
              { userIsAuth
              ? <span>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/documents">All Documents</Link></li>
              </span>
              : '' }
              {isAdmin ? <li><Link to="/users">Manage Users</Link></li> : ''}
              { userIsAuth
              ? <li>
                  <Link activeClassName="active" to="/logout" onClick={this.logout}>
                Logout</Link>
                </li>
                : <span>
                  <li><Link className="login" to="/login">Login</Link></li>
                  <li id="signup"><Link to="/signup">Signup</Link></li>
                </span>
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

/**
 * @desc Set the propTypes
 */
Navbar.PropTypes = {
  logout: PropTypes.func,
  authUser: PropTypes.object,
  isAuth: PropTypes.bool
};

/**
 * @desc Set the contextTypes
 */
Navbar.contextTypes = {
  router: PropTypes.object,
  isAuth: PropTypes.bool
};

/**
 *  map state to props
 *
 * @param {state} state
 * @returns {*} props
 */
const mapStateToProps = state => ({
  authUser: state.authenticated.user || '',
  isAuth: state.authenticated.isAuth
});

export default connect(mapStateToProps, { logout })(Navbar);
