import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends React.Component {
  render() {
    return (
      <header>
        <nav className="navigation">
          <Link to="tech">Tech</Link>
          <Link to="clothes">Clothes</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
