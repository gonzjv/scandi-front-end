import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { client } from '@tilework/opus';
import { connect } from 'react-redux';

import Layout from './components/layout/layout.js';
import Products from './components/products/products.js';
import ProductDescription from './components/product-description/product-description.js';
import Cart from './components/cart/cart.js';
import Home from './components/home/home.js';
import GetCategoriesQuery from './getCategoriesQuery.js';
import { setCategories } from './redux/actions/categories-actions.js';

class App extends React.Component {
  async componentDidMount() {
    client.setEndpoint(process.env.REACT_APP_API_URL);
    const { categories } = await client.post(GetCategoriesQuery());
    this.props.setCategories(categories);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {this.props.categories.map((category) => (
              <Route
                path={category.name}
                key={category.name}
                element={
                  <Products
                    category={category.name}
                    key={category.name + 1}
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

const mapStateToProps = (state) => {
  const categories = state.categories;
  return { categories };
};

const actionCreators = {
  setCategories,
};

export default connect(mapStateToProps, actionCreators)(App);
