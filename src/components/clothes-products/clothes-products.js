import React from 'react';
import { client } from '@tilework/opus';
import './clothes-products.css';
import CLOTHES_INITIAL_STATE from './clothes-initial-state.js';
import ClothesProductsQuery from './clothes-products-query.js';

client.setEndpoint('http://localhost:4000/');

class ClothesProducts extends React.Component {
  constructor() {
    super();
    this.state = CLOTHES_INITIAL_STATE;
  }

  async componentDidMount() {
    const products = await client.post(ClothesProductsQuery);
    this.setState({ data: products });
    console.log('state', this.state);
  }

  render() {
    const { data } = this.state;
    return (
      <main className="product-list">
        {data.category.products.map((el) => (
          <div key={el.name} className="product">
            <figure>
              <img
                src={el.gallery[0]}
                className="image"
                alt={el.name}
              ></img>
            </figure>
            <p>{el.name}</p>
            <div className="price">
              <p>
                {Math.round(Number(el.prices[0].amount)).toString()}
              </p>
              <p>{el.prices[0].currency.label}</p>
            </div>
          </div>
        ))}
      </main>
    );
  }
}

export default ClothesProducts;
