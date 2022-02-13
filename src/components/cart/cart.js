import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
  render() {
    const cart = this.props.cart;
    const currency = this.props.currency;
    console.log('cart:', cart);
    return (
      <main>
        <h2>Cart</h2>
        <ul>
          {cart.map((product) => (
            <li>
              <p>{product.name}</p>
              <p>
                {' '}
                {Math.round(
                  Number(
                    product.prices.find(
                      (el) => el.currency.label === currency
                    ).amount
                  )
                ).toString()}
                {currency}
              </p>
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
