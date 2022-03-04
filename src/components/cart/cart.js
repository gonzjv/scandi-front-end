import React from 'react';
import { connect } from 'react-redux';
import './cart.css';
import {
  increaseQuantity,
  decreaseQuantity,
} from '../../redux/actions/cart-actions.js';
import { v4 as uuidv4 } from 'uuid';
import { unsetMiniCartVisible } from '../../redux/actions/layout-actions.js';

class Cart extends React.Component {
  componentDidMount() {
    this.props.unsetMiniCartVisible();
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
      <main className="cart">
        <h2>Cart</h2>
        <ul className="cart-product-list">
          {cart.items.map((product) => (
            <li key={uuidv4()} className="product">
              <div className="left-side">
                <strong>{product.name}</strong>
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
        <div className="total">
          <strong>Total:</strong>
          <strong>
            {currency}
            {total}
          </strong>
        </div>
        <button className="check-out">CHECK OUT</button>
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
  unsetMiniCartVisible,
};

export default connect(mapStateToProps, actionCreators)(Cart);
