import React from 'react';
import Products from '../products/products.js';

class Home extends React.Component {
  render() {
    return (
      <main className="home">
        <h4>All products</h4>
        <Products category="tech" key={'tech'} />
        <Products category="clothes" key={'clothes'} />
      </main>
    );
  }
}

export default Home;
