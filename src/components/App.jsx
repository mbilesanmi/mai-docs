import React from 'react';
import Navbar from './common/Navbar.jsx';
import Footer from './common/Footer.jsx';

/**
 * Component to persist across all routes
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {

  /**
   * Renders the view of the component
   * @returns {Object} react component to render
   * @memberOf App
   */
  render() {
    return (
      <div className="login_body">
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
