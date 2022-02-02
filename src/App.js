import './App.css';
import React from 'react';
import TechProducts from './components/tech-products/tech-products.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <TechProducts />;
      </div>
    );
  }
}

export default App;
