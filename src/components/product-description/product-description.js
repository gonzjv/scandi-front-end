import { client } from '@tilework/opus';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import getDescriptionQuery from './get-description-query.js';
import DESCRIPTION_INITIAL_STATE from './initial-state.js';
import './product-description.css';
import { setMainImageUrl } from '../../redux/actions/main-image-actions.js';

class ProductDescription extends React.Component {
  constructor() {
    super();
    this.state = DESCRIPTION_INITIAL_STATE;
  }

  async componentDidMount() {
    const id = this.props.params.id;
    const products = await client.post(getDescriptionQuery(id));
    this.setState({ data: products });

    const initialImageUrl = this.state.data.product.gallery[0];
    this.props.setMainImageUrl(initialImageUrl);
  }

  render() {
    const { data } = this.state;
    const product = data.product;
    const setMainImageUrl = this.props.setMainImageUrl;
    console.log('data:', data);
    return (
      <main className="description">
        <p>Name: {product.name} </p>
        <p>Brand: {product.brand} </p>
        <p>Category: {product.category} </p>
        <p>
          In stock:{' '}
          {product.inStock ? <span>✅</span> : <span>❌</span>}
        </p>
        <div>
          {product.attributes.map((attribute) => (
            <div className="attribute" key={attribute.name}>
              {attribute.name} :
              {attribute.items.map((item) => (
                <span key={item.displayValue}>
                  {item.displayValue}
                </span>
              ))}
            </div>
          ))}
        </div>
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
        <p
          dangerouslySetInnerHTML={{
            __html: data.product.description,
          }}
        />
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
  return { imageUrl };
};

const actionCreators = {
  setMainImageUrl,
};

export default connect(
  mapStateToProps,
  actionCreators
)(withRouter(ProductDescription));
