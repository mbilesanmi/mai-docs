import React, { Component } from 'react';
import { Link } from 'react-router';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Mai Docs</h1>
        <p>Mai Document manager</p>
        <Link to="about">How to use</Link>
      </div>
    );
  }
}

export default HomePage;
