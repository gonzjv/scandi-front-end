import { client } from '@tilework/opus';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import getDescriptionQuery from '../../queries/get-description-query.js';
import DESCRIPTION_INITIAL_STATE from './initial-state.js';
import './product-description.css';
import { setMainImageUrl } from '../../redux/actions/main-image-actions.js';
import {
  setAttribute,
  clearAttributes,
} from '../../redux/actions/attributes.js';
import { addToCart } from '../../redux/actions/cart-actions.js';
import { ReactComponent as SwitcherArrow } from '../../assets/img/switcher-arrow.svg';

class ProductDescription extends React.Component {
  constructor() {
    super();
    this.state = DESCRIPTION_INITIAL_STATE;

    this.handleHoverUp = this.handleHoverUp.bind(this);
    this.handleHoverDown = this.handleHoverDown.bind(this);
  }

  async componentDidMount() {
    const id = this.props.params.id;
    const productData = await client.post(getDescriptionQuery(id));
    this.setState({ data: productData });

    const product = this.state.data.product;
    const initialImageUrl = product.gallery[0];
    this.props.setMainImageUrl(initialImageUrl);

    this.props.clearAttributes();

    product.attributes.map((elem) =>
      this.props.setAttribute(elem.name, elem.items[0].value)
    );
  }

  handleHoverUp() {
    this.setState({
      isGalleryAtTop: true,
    });
  }

  handleHoverDown() {
    this.setState({
      isGalleryAtTop: false,
    });
  }

  render() {
    const { data, isGalleryAtTop } = this.state;
    const { product } = data;
    const {
      setMainImageUrl,
      setAttribute,
      addToCart,
      attributes,
      currency,
    } = this.props;

    console.log('data:', data);

    return (
      <main className="item-description">
        <section className="descr-left">
          <figure className="gallery">
            <aside className="sidebar-container">
              <button
                onMouseEnter={this.handleHoverUp}
                className="btn-up"
              >
                <SwitcherArrow className="rotated" />
              </button>
              <div
                className={
                  isGalleryAtTop ? 'sidebar' : 'sidebar at-bottom'
                }
              >
                {product.gallery.map((url) => (
                  <img
                    key={url}
                    src={url}
                    className="sidebar-image"
                    alt={url}
                    onClick={() => setMainImageUrl(url)}
                  ></img>
                ))}
              </div>
              <button
                onMouseEnter={this.handleHoverDown}
                className="btn-down"
              >
                <SwitcherArrow />
              </button>
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
                product.gallery,
                product.prices,
                attributes,
                product.attributes
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
