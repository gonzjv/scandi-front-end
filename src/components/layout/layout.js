import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/header.js';
import './layout.css';

class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <Outlet />
      </div>
    );
  }
}

export default Layout;
