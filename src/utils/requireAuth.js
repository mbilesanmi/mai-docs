import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

/**
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
 */
export default function (ComposedComponent) {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        toastr.error('You need to login to access this page');
        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  /**
   * @desc Set the PropTypes
   */
  RequireAuth.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired
  };

  /**
   * @desc Set the contextTypes
   */
  RequireAuth.contextTypes = {
    router: PropTypes.object.isRequired
  };

  /**
   *
   * @param {any} state
   * @returns {boolean} isAuthenticated
   * @returns {*} isAdmin
   */
  const mapStateToProps = state => ({
    isAuthenticated: state.authenticated.isAuth
  });

  return connect(mapStateToProps)(RequireAuth);
}
