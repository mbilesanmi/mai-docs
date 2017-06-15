import React, { Component, PropTypes } from 'react';
import Header from './common/header/Header.jsx';

/**
 * @desc component used to display the main site App component
 * @class App
 * @extends {Component}
 */
class App extends Component {
   /**
   * React Render
   * @return {object} html
   */
  render() {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
App.propTypes = {
  children: PropTypes.element
};

export default App;
