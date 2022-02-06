import React from 'react';
import { client } from '@tilework/opus';
import './products.css';
import PRODUCTS_INITIAL_STATE from './initial-state.js';
import GetProductsQuery from './products-query.js';
import { connect } from 'react-redux';

client.setEndpoint('http://localhost:4000/');

class Products extends React.Component {
  constructor() {
    super();
    this.state = PRODUCTS_INITIAL_STATE;
  }

  async componentDidMount() {
    const products = await client.post(
      GetProductsQuery(this.props.category)
    );
    this.setState({ data: products });
  }

  render() {
    const { data } = this.state;
    const currency = this.props.currency;
    const category = this.props.category;
    console.log('data', data);

    return (
      <main className="product-list">
        {category}
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
  const category = state.category;
  return { currency, category };
};

export default connect(mapStateToProps)(Products);
