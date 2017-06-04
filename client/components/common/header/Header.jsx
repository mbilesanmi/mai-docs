import React from 'react';
import { IndexLink } from 'react-router';
import MainMenu from './MainMenu.jsx';

const Header = () => (
    <nav className="nav-wrapper teal" role="navigation">
      <IndexLink to="/" classID="logo-container" className="brand-logo">
        Mai Docs
      </IndexLink>
       <MainMenu />
    </nav>
  );

export default Header;
