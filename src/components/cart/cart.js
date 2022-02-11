import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
  render() {
    const cart = this.props.cart;
    console.log('cart:', cart);
    return (
      <main>
        Cart here!
        {cart.map((product) => (
          <div>{product.name}</div>
        ))}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const cart = state.cart;
  return { cart };
};

export default connect(mapStateToProps)(Cart);
