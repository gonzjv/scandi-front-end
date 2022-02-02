import React from 'react';
import { client } from '@tilework/opus';
import './tech-products.css';
import techProductsQuery from './tech-products-query.js';
import TECH_INITIAL_STATE from './tech-initial-state.js';

client.setEndpoint('http://localhost:4000/');

class TechProducts extends React.Component {
  constructor() {
    super();
    this.state = TECH_INITIAL_STATE;
  }

  async componentDidMount() {
    const products = await client.post(techProductsQuery);
    this.setState({ data: products });
    console.log('state', this.state);
  }

  render() {
    const { data } = this.state;
    return (
      <section className="product-list">
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
      </section>
    );
  }
}

export default TechProducts;
