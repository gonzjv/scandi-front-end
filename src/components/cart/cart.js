import React from 'react';
import { connect } from 'react-redux';
import './cart.css';

class Cart extends React.Component {
  render() {
    const cart = this.props.cart;
    const currency = this.props.currency;
    console.log('cart:', cart);
    return (
      <main>
        <h2>Cart</h2>
        <ul className="cart-product-list">
          {cart.map((product) => (
            <li key={Math.random()}>
              <p>{product.name}</p>
              <p>
                {Math.round(
                  Number(
                    product.prices.find(
                      (el) => el.currency.label === currency
                    ).amount
                  )
                ).toString()}
                {currency}
              </p>
              <ul className="attributes">
                {Object.keys(product.attributes).map((key) => (
                  <li className="element" key={key}>
                    <p>{key}</p>
                    <p>{product.attributes[key]}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const cart = state.cart;
  const currency = state.currency;
  return { cart, currency };
};

export default connect(mapStateToProps)(Cart);
