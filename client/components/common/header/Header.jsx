import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import toastr from 'toastr';
import MainMenu from './MainMenu.jsx';
import { logout } from '../../../actions/userActions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  static componentWillMount() {
    $('.dropdown-button').dropdown();
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
    toastr.info('You are now logged out');
    this.context.router.push('/');
  }

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

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  isAdmin: PropTypes.object
};

// Pull in the React Router context
// so router is available on this.context.router.
Header.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = state => ({
  loggedIn: state.isAuth.isAuthenticated,
  isAdmin: state.isAuth.loggedInUser
});

export default connect(mapStateToProps, { logout })(Header);
