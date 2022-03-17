import React from 'react';
import { client } from '@tilework/opus';
import './products.css';
import PRODUCTS_INITIAL_STATE from './initial-state.js';
import GetProductsQuery from './products-query.js';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ReactComponent as AddToCartIcon } from '../../assets/img/add-to-cart.svg';

client.setEndpoint('http://localhost:4000/');

class Products extends React.Component {
  constructor() {
    super();
    this.state = PRODUCTS_INITIAL_STATE;
  }

  async componentDidMount() {
    const products = await client.post(
      GetProductsQuery(this.props.category)
    );
    this.setState({ data: products });
  }

  handleNav(id) {
    this.setState({ navigateToDesription: true, productId: id });
  }

  handleMouseEnter(id) {
    this.setState({
      addToCartIcon: { display: true, id: id },
    });
    console.log('addToCartIcon:', this.state.addToCartIcon);
  }

  handleMouseLeave() {
    this.setState({
      addToCartIcon: { display: false, id: '' },
    });
  }

  render() {
    const { data } = this.state;
    const navigateToDesription = this.state.navigateToDesription;
    const productId = this.state.productId;
    const currency = this.props.currency;
    console.log('data', data);

    return (
      <section className="product-list">
        {navigateToDesription && (
          <Navigate to={`/description/${productId}`} replace={true} />
        )}
        {data.category.products.map((el) => (
          <figure
            onClick={() => this.handleNav(el.id)}
            onMouseEnter={() => this.handleMouseEnter(el.id)}
            onMouseLeave={() => this.handleMouseLeave}
            key={el.name}
            className="product"
          >
            <img
              src={el.gallery[0]}
              className="image"
              alt={el.name}
            ></img>
            <figcaption className="description">
              <p>{el.name}</p>
              <strong className="price">
                <p>
                  {Math.round(
                    Number(
                      el.prices.find(
                        (el) => el.currency.symbol === currency
                      ).amount
                    )
                  ).toString()}
                </p>
                <p>{currency}</p>
              </strong>
            </figcaption>
            <div className={el.inStock ? 'hidden' : 'out-of-stock'}>
              OUT OF STOCK
            </div>
            {this.state.addToCartIcon.display &&
            this.state.addToCartIcon.id === el.id ? (
              <AddToCartIcon className="to-cart-icon" />
            ) : undefined}
          </figure>
        ))}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const currency = state.currency;
  return { currency };
};

export default connect(mapStateToProps)(Products);
