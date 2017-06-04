import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import MainMenu from './MainMenu.jsx';
import { logout } from '../../../actions/userActions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <nav className="nav-wrapper teal" role="navigation">
        <IndexLink to="/dashboard" classID="logo-container" className="brand-logo">
          Mai Docs
        </IndexLink>
        <MainMenu logout={this.logout} />
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Header);
// export default Header;
