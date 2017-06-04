import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const MainMenu = ({ logout }) => (
  <div>
    <ul className="right hide-on-med-and-down">
      <li>
        <Link activeClassName="active" to="/about">About</Link>
      </li>
      <li>
        <Link activeClassName="active" to="/documents">Documents</Link>
      </li>
      <li>
        <Link activeClassName="active" to="/users">Manage Users</Link>
      </li>
      <li>
        <Link activeClassName="active" to="/roles">Manage Roles</Link>
      </li>
      <li>
        <Link activeClassName="active" to="/logout" onClick={logout}>Logout</Link>
      </li>
    </ul>

    <ul id="nav-mobile" className="side-nav">
      <li>
        <Link activeClassName="active" to="/about">About</Link>
      </li>
      <li>
        <Link activeClassName="active" to="/documents">Documents</Link>
      </li>
      <li>
        <Link activeClassName="active" to="/users">Manage Users</Link>
      </li>
      <li>
        <Link activeClassName="active" to="/roles">Manage Roles</Link>
      </li>
      <li>
        <Link activeClassName="active" to="/logout" onClick={logout}>Logout</Link>
      </li>
    </ul>
    <a href="#" dataactivates="nav-mobile" className="button-collapse">
      <i className="material-icons">Menu</i>
    </a>
  </div>
);

MainMenu.propTypes = {
  logout: PropTypes.func
};

export default MainMenu;
