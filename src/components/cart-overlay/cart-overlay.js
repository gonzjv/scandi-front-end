import React from 'react';
import { connect } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
} from '../../redux/actions/cart-actions.js';
import './cart-overlay.css';
import { v4 as uuidv4 } from 'uuid';
import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

class CartOverlay extends React.Component {
  targetElem = null;

  componentDidMount() {
    this.targetElem = document.querySelector('#cart-overlay');
    disableBodyScroll(this.targetElem);
  }

  componentWillUnmount() {
    enableBodyScroll(this.targetElem);
  }

  render() {
    const cart = this.props.cart;
    const currency = this.props.currency;
    const total = Math.round(
      Number(
        cart.total.find((el) => el.currency.symbol === currency)
          .amount
      )
    ).toString();

    console.log('total:', total);
    console.log('cart:', cart);

    return (
      <aside className="cart-overlay" id="cart-overlay">
        <header className="cart-overlay-header">
          <h4>My Bag,</h4>
          <p>{cart.itemsInCart} items</p>
        </header>
        <div className="container">
          <ul className="overlay-product-list">
            {cart.items.map((product) => (
              <li key={uuidv4()} className="product">
                <div className="left-side">
                  <p className="name">{product.name}</p>
                  <ul className="attributes">
                    {Object.keys(product.attributes).map((key) => (
                      <li className="element" key={key}>
                        <p className="name">{key}:</p>
                        <em className="value">
                          {product.attributes[key]}
                        </em>
                      </li>
                    ))}
                  </ul>
                  <div className="price">
                    <p>
                      {Math.round(
                        Number(
                          product.prices.find(
                            (el) => el.currency.symbol === currency
                          ).amount
                        )
                      ).toString()}
                    </p>
                    <p>{currency}</p>
                  </div>
                </div>
                <figure>
                  <figcaption className="quantity">
                    <button
                      className="plus-minus-btn"
                      onClick={() =>
                        this.props.increaseQuantity(product.id)
                      }
                    >
                      +
                    </button>
                    {product.quantity}
                    <button
                      disabled={product.quantity > 0 ? false : true}
                      className="plus-minus-btn"
                      onClick={() =>
                        this.props.decreaseQuantity(product.id)
                      }
                    >
                      -
                    </button>
                  </figcaption>
                  <img
                    src={product.imageUrl}
                    className="cart-overlay-image"
                    alt={product.name}
                  ></img>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        <footer className="overlay-footer">
          <div className="total">
            <h4>Total</h4>
            <h4>
              {total}
              {currency}
            </h4>
          </div>
          <div className="buttons">
            <button className="view-bag"> VIEW BAG</button>
            <button className="check-out">CHECK OUT</button>
          </div>
        </footer>
      </aside>
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

export default connect(mapStateToProps, actionCreators)(CartOverlay);
