import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './layout.css';

class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <nav className="navigation">
          <Link to="tech">Tech</Link>
          <Link to="clothes">Clothes</Link>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    );
  }
}

export default Layout;
