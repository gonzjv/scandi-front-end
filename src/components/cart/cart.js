import React from 'react';
import { connect } from 'react-redux';
import './cart.css';
import {
  increaseQuantity,
  decreaseQuantity,
} from '../../redux/actions/cart-actions.js';

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
            <li key={Math.random()} className="product">
              <div>
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
              </div>
              <figure>
                <figcaption className="quantity">
                  <button
                    onClick={() =>
                      this.props.increaseQuantity(product.id)
                    }
                  >
                    +
                  </button>
                  {product.quantity}
                  <button
                    onClick={() =>
                      this.props.decreaseQuantity(product.id)
                    }
                  >
                    -
                  </button>
                </figcaption>
                <img
                  src={product.imageUrl}
                  className="image"
                  alt={product.name}
                ></img>
              </figure>
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

const actionCreators = {
  increaseQuantity,
  decreaseQuantity,
};

export default connect(mapStateToProps, actionCreators)(Cart);
