import React from 'react';
import { client } from '@tilework/opus';
import './products.css';
import PRODUCTS_INITIAL_STATE from './initial-state.js';
import GetProductsQuery from './products-query.js';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

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
    console.log('props.category', this.props.category);
    this.setState({ data: products });
  }
  handleNav = () => {
    this.setState({ navigateToDesription: true });
  };

  render() {
    const { data } = this.state;
    const navigateToDesription = this.state.navigateToDesription;
    const currency = this.props.currency;
    console.log('data', data);

    return (
      <main className="product-list">
        {this.props.category}
        {data.category.products.map((el) => (
          <div
            onClick={this.handleNav}
            key={el.name}
            className="product"
          >
            {navigateToDesription && (
              <Navigate to={`/description/${el.id}`} replace={true} />
            )}
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

export default connect(mapStateToProps)(Products);
