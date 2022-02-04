import React from 'react';
import { client } from '@tilework/opus';
import './tech-products.css';
import techProductsQuery from './tech-products-query.js';
import TECH_INITIAL_STATE from './tech-initial-state.js';
import { connect } from 'react-redux';

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
    const currency = this.props.currency;
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
                {Math.round(
                  Number(
                    el.prices.find(
                      (el) => el.currency.label === currency
                    ).amount
                  )
                ).toString()}
              </p>
              <p>{currency}</p>
            </div>
          </div>
        ))}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const currency = state.currency;
  return { currency };
};

export default connect(mapStateToProps)(TechProducts);
