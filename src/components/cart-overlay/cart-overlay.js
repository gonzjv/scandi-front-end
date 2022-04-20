import React from 'react';
import { connect } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
} from '../../redux/actions/cart-actions.js';
import './cart-overlay.css';
import { v4 as uuidv4 } from 'uuid';
// import {
//   disableBodyScroll,
//   enableBodyScroll,
// } from 'body-scroll-lock';
import { NavLink } from 'react-router-dom';

class CartOverlay extends React.Component {
  targetElem = null;

  componentDidMount() {
    this.targetElem = document.querySelector('#cart-overlay');
    // disableBodyScroll(this.targetElem);
  }

  componentWillUnmount() {
    // enableBodyScroll(this.targetElem);
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
                  <ul className="attributes">
                    {product.allAttributes.map((attribute) => (
                      <li key={uuidv4()}>
                        <ul className="attribute">
                          {attribute.name === 'Color' &&
                            attribute.items.map((item) => (
                              <li
                                className={
                                  item.value ===
                                  product.attributes[attribute.name]
                                    ? 'chosen-color'
                                    : 'attribute-color'
                                }
                                style={{
                                  backgroundColor: item.value,
                                }}
                                key={uuidv4()}
                              ></li>
                            ))}
                          {attribute.name !== 'Color' &&
                            attribute.items.map((item) => (
                              <li
                                className={
                                  item.value ===
                                  product.attributes[attribute.name]
                                    ? 'chosen-attribute'
                                    : 'attribute-item'
                                }
                                key={uuidv4()}
                              >
                                {item.value}
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="right-side">
                  <button
                    className="delete"
                    onClick={() =>
                      this.props.deleteFromCart(
                        product.id,
                        product.prices,
                        product.quantity
                      )
                    }
                  >
                    delete
                  </button>
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
                </div>
              </li>
            ))}
          </ul>
        </div>
        <footer className="overlay-footer">
          <div className="total">
            <strong>Total</strong>
            <strong>
              {total}
              {currency}
            </strong>
          </div>
          <div className="buttons">
            <NavLink className="view-bag" to="cart">
              VIEW BAG
            </NavLink>
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
  deleteFromCart,
};

export default connect(mapStateToProps, actionCreators)(CartOverlay);
