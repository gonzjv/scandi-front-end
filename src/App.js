import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout.js';
import Products from './components/products/products.js';
import ProductDescription from './components/product-description/product-description.js';
import Cart from './components/cart/cart.js';
import Home from './components/home/home.js';
import GetCategoriesQuery from './getCategoriesQuery.js';
import { client } from '@tilework/opus';

class App extends React.Component {
  constructor() {
    super();
    this.state = { categories: [] };
  }
  async componentDidMount() {
    const { categories } = await client.post(GetCategoriesQuery());
    this.setState({ categories: categories });
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {this.state.categories.map((category) => (
              <Route
                path={category.name}
                key={category.name}
                element={
                  <Products
                    category={category.name}
                    key={category.name}
                  />
                }
              />
            ))}
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
