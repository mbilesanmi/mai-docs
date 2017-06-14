import React from 'react';
import { Link } from 'react-router';

/**
 * @desc component used to display the main menu
 */
const MainMenu = ({ loggedIn, logout, isAdmin }) =>
  <div>
    {$('.dropdown-button').dropdown()}
    {
      loggedIn
        ? <ul className="right hide-on-med-and-down">
          <li>
            <Link activeClassName="active" to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link activeClassName="active" to="/documents">Documents</Link>
          </li>
          {
            isAdmin === 1
            ? <li>
              <Link activeClassName="active" to="/users">Manage Users</Link>
            </li> : ''
          }
          <li>
            <Link activeClassName="active" to="/logout" onClick={logout}>
              Logout</Link>
          </li>
        </ul>
      : <ul className="right hide-on-med-and-down">
          <li>
            <Link activeClassName="active" to="/">Login</Link>
          </li>
          <li>
            <Link activeClassName="active" to="/signup">Signup</Link>
          </li>
        </ul>
    }

    {
      loggedIn
        ? <ul id="nav-mobile" className="side-nav">
          <li>
            <Link activeClassName="active" to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link activeClassName="active" to="/documents">Documents</Link>
          </li>
          <li>
            <Link activeClassName="active" to="/users">Manage Users</Link>
          </li>
          <li>
            <Link activeClassName="active" to="/logout" onClick={logout}>
              Logout</Link>
          </li>
        </ul>
      : <ul id="nav-mobile" className="side-nav">
          <li>
            <Link activeClassName="active" to="/">Login</Link>
          </li>
          <li>
            <Link activeClassName="active" to="/signup">Signup</Link>
          </li>
        </ul>
    }
    <a href="#" dataactivates="nav-mobile" className="button-collapse">
      <i className="material-icons">Menu</i>
    </a>
  </div>
;

/**
 * @desc Set the PropTypes
 */
MainMenu.propTypes = {
  logout: React.PropTypes.func,
  isAdmin: React.PropTypes.number,
  loggedIn: React.PropTypes.bool
};

export default MainMenu;
