import './App.css';
import React from 'react';
import TechProducts from './components/tech-products/tech-products.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout.js';
import ClothesProducts from './components/clothes-products/clothes-products.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TechProducts />} />
            <Route path="tech" element={<TechProducts />} />
            <Route path="clothes" element={<ClothesProducts />} />
            {/* <TechProducts />; */}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
