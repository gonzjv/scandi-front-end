import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout.js';
import Products from './components/products/products.js';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {console.log('category:', category)}
            <Route index element={<Products key={category} />} />
            {/* <Route path="tech" element={<TechProducts />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  const category = state.category;
  return { category };
};

export default connect(mapStateToProps)(App);
