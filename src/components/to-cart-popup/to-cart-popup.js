import React from 'react';
import { connect } from 'react-redux';
import { client } from '@tilework/opus';
import './to-cart-popup.css';
import { setAttribute } from '../../redux/actions/attributes.js';
import { addToCart } from '../../redux/actions/cart-actions.js';
import DESCRIPTION_INITIAL_STATE from './initial-state.js';
import getDescriptionQuery from '../../queries/get-description-query.js';

class ToCartPopup extends React.Component {
  constructor() {
    super();
    this.state = DESCRIPTION_INITIAL_STATE;
  }

  async componentDidMount() {
    const productData = await client.post(
      getDescriptionQuery(this.props.id)
    );
    this.setState({ data: productData });

    const product = this.state.data.product;

    product.attributes.map((elem) =>
      this.props.setAttribute(elem.name, elem.items[0].displayValue)
    );
  }

  render() {
    const { product } = this.state.data;
    const { attributes } = this.props;
    const { currency } = this.props;
    const { setAttribute } = this.props;
    const { addToCart } = this.props;
    const initialImageUrl = product.gallery[0];
    console.log('product', product);

    return (
      <aside className="to-cart-popup-wrap">
        <div className="to-cart-popup">
          <img
            src={initialImageUrl}
            className="descr-image"
            alt={product.name}
          ></img>
          <section className="right-side">
            <div className="top">
              <strong>{product.name} </strong>
              <p>{product.brand} </p>
            </div>
            <div className="attributes">
              {product.attributes.map((attribute) => (
                <div className="attribute" key={attribute.name}>
                  <strong>{attribute.name}:</strong>
                  <div className="values">
                    {attribute.name === 'Color' &&
                      attribute.items.map((item) => (
                        <button
                          className={
                            item.value === attributes[attribute.name]
                              ? 'chosen-color'
                              : 'attribute-btn'
                          }
                          style={{ backgroundColor: item.value }}
                          key={item.value}
                          onClick={() =>
                            setAttribute(attribute.name, item.value)
                          }
                        ></button>
                      ))}
                    {attribute.name !== 'Color' &&
                      attribute.items.map((item) => (
                        <button
                          className={
                            item.value === attributes[attribute.name]
                              ? 'chosen-attribute'
                              : 'attribute-btn'
                          }
                          key={item.value}
                          onClick={() =>
                            setAttribute(attribute.name, item.value)
                          }
                        >
                          {item.displayValue}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="price">
              <strong>Price:</strong>
              <p className="price-value">
                {currency}
                {Math.round(
                  Number(
                    product.prices.find(
                      (el) => el.currency.symbol === currency
                    ).amount
                  )
                ).toString()}
              </p>
              {product.inStock ? (
                ''
              ) : (
                <p className="price-out-of-stock">OUT OF STOCK</p>
              )}
            </div>
            <button
              disabled={product.inStock ? false : true}
              onClick={() =>
                addToCart(
                  product.name,
                  product.gallery[0],
                  product.prices,
                  attributes,
                  product.attributes
                )
              }
              className="add-to-cart"
            >
              {'add to cart'.toUpperCase()}
            </button>
          </section>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  const { attributes } = state;
  const { currency } = state;
  return { attributes, currency };
};

const actionCreators = {
  setAttribute,
  addToCart,
};

export default connect(mapStateToProps, actionCreators)(ToCartPopup);
