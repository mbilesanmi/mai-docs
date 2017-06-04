import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

/**
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
 */
export default function (ComposedComponent) {
  class RequireAuth extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        toastr.error('You need to login to access this page');
        this.context.router.push('/');
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
    isAuthenticated: React.PropTypes.bool.isRequired
  };

  RequireAuth.contextTypes = {
    router: PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return { isAuthenticated: state.isAuth.isAuthenticated };
  }

  return connect(mapStateToProps)(RequireAuth);
}
