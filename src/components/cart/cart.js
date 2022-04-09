import React from 'react';
import { connect } from 'react-redux';
import './cart.css';
import {
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
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
                              style={{ backgroundColor: item.value }}
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
                    className="image"
                    alt={product.name}
                  ></img>
                </figure>
              </div>
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
  deleteFromCart,
  unsetMiniCartVisible,
};

export default connect(mapStateToProps, actionCreators)(Cart);
