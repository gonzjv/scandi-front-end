import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout.js';
import Products from './components/products/products.js';
import ProductDescription from './components/product-description/product-description.js';
import Cart from './components/cart/cart.js';
import Home from './components/home/home.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="tech"
              element={<Products category="tech" key={'tech'} />}
            />
            <Route
              path="clothes"
              element={
                <Products category="clothes" key={'clothes'} />
              }
            />
            <Route
              path="description/:id"
              element={<ProductDescription />}
            />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
