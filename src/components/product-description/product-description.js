import { client } from '@tilework/opus';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import getDescriptionQuery from './get-description-query.js';
import DESCRIPTION_INITIAL_STATE from './initial-state.js';
import './product-description.css';
import { setMainImageUrl } from '../../redux/actions/main-image-actions.js';
import {
  setAttribute,
  clearAttributes,
} from '../../redux/actions/attributes.js';
import { addToCart } from '../../redux/actions/cart-actions.js';

class ProductDescription extends React.Component {
  constructor() {
    super();
    this.state = DESCRIPTION_INITIAL_STATE;
  }

  async componentDidMount() {
    const id = this.props.params.id;
    const products = await client.post(getDescriptionQuery(id));
    this.setState({ data: products });

    const product = this.state.data.product;
    const initialImageUrl = product.gallery[0];
    this.props.setMainImageUrl(initialImageUrl);

    this.props.clearAttributes();

    product.attributes.map((elem) =>
      this.props.setAttribute(elem.name, elem.items[0].displayValue)
    );
  }

  render() {
    const { data } = this.state;
    const product = data.product;
    const setMainImageUrl = this.props.setMainImageUrl;
    const setAttribute = this.props.setAttribute;
    const addToCart = this.props.addToCart;
    const attributes = this.props.attributes;
    const currency = this.props.currency;

    console.log('data:', data);

    return (
      <main className="item-description">
        <section className="descr-left">
          <figure className="gallery">
            <aside className="sidebar">
              {product.gallery.map((url) => (
                <img
                  key={url}
                  src={url}
                  className="sidebar-image"
                  alt={url}
                  onClick={() => setMainImageUrl(url)}
                ></img>
              ))}
            </aside>
            <img
              src={this.props.imageUrl}
              className="descr-image"
              alt={product.name}
            ></img>
          </figure>
        </section>
        <section className="descr-right">
          <div className="top">
            <strong>{product.name} </strong>
            <p>{product.brand} </p>
          </div>
          {/* <p>Category: {product.category} </p> */}
          {/* <p>
            In stock:
            {product.inStock ? <span>✅</span> : <span>❌</span>}
          </p> */}
          <div className="attributes">
            {product.attributes.map((attribute) => (
              <div className="attribute" key={attribute.name}>
                <strong>{attribute.name}:</strong>
                <div className="values">
                  {attribute.items.map((item) => (
                    <button
                      className={
                        item.displayValue ===
                        attributes[attribute.name]
                          ? 'chosen-attribute'
                          : 'attribute-btn'
                      }
                      key={item.displayValue}
                      onClick={() =>
                        setAttribute(
                          attribute.name,
                          item.displayValue
                        )
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
          {console.log('inStock', product.inStock)}
          <button
            disabled={product.inStock ? false : true}
            onClick={() =>
              addToCart(
                product.name,
                product.gallery[0],
                product.prices,
                attributes
              )
            }
            className="add-to-cart"
          >
            {'add to cart'.toUpperCase()}
          </button>
          <p
            dangerouslySetInnerHTML={{
              __html: data.product.description,
            }}
          />
        </section>
      </main>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

const mapStateToProps = (state) => {
  const imageUrl = state.mainImageUrl;
  const attributes = state.attributes;
  const currency = state.currency;
  return { imageUrl, attributes, currency };
};

const actionCreators = {
  setMainImageUrl,
  setAttribute,
  addToCart,
  clearAttributes,
};

export default connect(
  mapStateToProps,
  actionCreators
)(withRouter(ProductDescription));
