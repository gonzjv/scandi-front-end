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
    console.log('cart:', cart);

    return (
      <aside className="cart-overlay" id="cart-overlay">
        <header className="cart-overlay-header">
          <h4>My Bag,</h4>
          <p>{cart.itemsInCart} items</p>
        </header>
        <ul className="cart-product-list">
          {cart.items.map((product) => (
            <li key={uuidv4()} className="product">
              <div className="left-side">
                <p>{product.name}</p>
                <ul className="attributes">
                  {Object.keys(product.attributes).map((key) => (
                    <li className="element" key={key}>
                      <p className="name">{key}:</p>
                      <p>{product.attributes[key]}</p>
                    </li>
                  ))}
                </ul>
                <p className="price">
                  <strong>
                    {Math.round(
                      Number(
                        product.prices.find(
                          (el) => el.currency.symbol === currency
                        ).amount
                      )
                    ).toString()}
                  </strong>
                  <strong>{currency}</strong>
                </p>
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
                  className="image"
                  alt={product.name}
                ></img>
              </figure>
            </li>
          ))}
        </ul>
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
