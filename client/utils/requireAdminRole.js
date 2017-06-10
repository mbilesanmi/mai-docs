import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

/**
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
 */
export default (ComposedComponent) => {
  class RequireAuth extends React.Component {
    componentWillMount() {
      const isAuthenticated = this.props.isAuthenticated;
      let isAdmin;
      if (isAuthenticated) {
        isAdmin = this.props.isAdmin.roleId;
      } else {
        isAdmin = 0;
      }

      if (isAdmin !== 1) {
        toastr.error('Unauthorized Access Denied.');
        this.context.router.push('/dashboard');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return (<ComposedComponent {...this.props} />);
    }
  }

  RequireAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.object
  };

  RequireAuth.contextTypes = {
    router: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.isAuth.isAuthenticated,
    isAdmin: state.isAuth.loggedInUser
  });

  return connect(mapStateToProps)(RequireAuth);
};
