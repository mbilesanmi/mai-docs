import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const MainMenu = ({ loggedIn, logout, isAdmin }) => (
  <div>
      {
        loggedIn ?
          <ul className="right hide-on-med-and-down">
            <li>
              <Link activeClassName="active" to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link activeClassName="active" to="/documents">Documents</Link>
            </li>
            {
              isAdmin === 1 ?
              <li>
                <Link activeClassName="active" to="/users">Manage Users</Link>
              </li> : ''
            }
            <li>
              <Link activeClassName="active" to="/logout" onClick={logout}>
                Logout</Link>
            </li>
          </ul>
        :
          <ul className="right hide-on-med-and-down">
            <li>
              <Link activeClassName="active" to="/">Login</Link>
            </li>
            <li>
              <Link activeClassName="active" to="/signup">Signup</Link>
            </li>
          </ul>
      }

    {
      loggedIn ?
        <ul id="nav-mobile" className="side-nav">
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
      :
        <ul id="nav-mobile" className="side-nav">
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
);

MainMenu.propTypes = {
  logout: PropTypes.func,
  isAdmin: PropTypes.number,
  loggedIn: PropTypes.bool
};

export default MainMenu;
