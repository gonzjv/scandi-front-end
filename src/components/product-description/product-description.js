import { client } from '@tilework/opus';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import getDescriptionQuery from './get-description-query.js';
import DESCRIPTION_INITIAL_STATE from './initial-state.js';
import './product-description.css';
import { setMainImageUrl } from '../../redux/actions/main-image-actions.js';
import { setAttribute } from '../../redux/actions/attributes.js';

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

    product.attributes.map((elem) =>
      this.props.setAttribute(elem.name, elem.items[0].displayValue)
    );
    // const initialAttributes = this.state.data.product.attributes[0];
  }

  render() {
    const { data } = this.state;
    const product = data.product;
    const setMainImageUrl = this.props.setMainImageUrl;
    const setAttribute = this.props.setAttribute;
    const attributes = this.props.attributes;
    const currency = this.props.currency;

    console.log('data:', data);

    return (
      <main className="description">
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
          <p>Name: {product.name} </p>
          <p>Brand: {product.brand} </p>
          <p>Category: {product.category} </p>
          <p>
            In stock:
            {product.inStock ? <span>✅</span> : <span>❌</span>}
          </p>
          <div className="attributes">
            {product.attributes.map((attribute) => (
              <div className="attribute" key={attribute.name}>
                {attribute.name} :
                {attribute.items.map((item) => (
                  <button
                    className={
                      item.displayValue === attributes[attribute.name]
                        ? 'chosen-attribute'
                        : ''
                    }
                    key={item.displayValue}
                    onClick={() =>
                      setAttribute(attribute.name, item.displayValue)
                    }
                  >
                    {item.displayValue}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="price">
            <p>
              {Math.round(
                Number(
                  product.prices.find(
                    (el) => el.currency.label === currency
                  ).amount
                )
              ).toString()}
            </p>
            <p>{currency}</p>
          </div>
          <button className="add-to-cart">
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
};

export default connect(
  mapStateToProps,
  actionCreators
)(withRouter(ProductDescription));
