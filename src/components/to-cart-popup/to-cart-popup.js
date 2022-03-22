import React from 'react';
import { connect } from 'react-redux';
import { client } from '@tilework/opus';
import './to-cart-popup.css';
import { setAttribute } from '../../redux/actions/attributes.js';
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
    // const { setAttribute } = this.props;
    const { product } = this.state.data;
    const { attributes } = this.props;
    const initialImageUrl = product.gallery[0];
    console.log('product', product);

    return (
      <aside className="to-cart-popup">
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
        </section>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  const { attributes } = state;
  return { attributes };
};

const actionCreators = {
  setAttribute,
};

export default connect(mapStateToProps, actionCreators)(ToCartPopup);
