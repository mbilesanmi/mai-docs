import React from 'react';
import Navbar from './common/Navbar.jsx';

/**
 * Component to persist across all routes
 * @class Common
 * @extends {React.Component}
 */
class Common extends React.Component {

  /**
   * Renders the view of the component
   * @returns {Object} react component to render
   * @memberOf Common
   */
  render() {
    return (
      <div className="login_body">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default Common;
