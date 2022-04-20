import React from 'react';
import './header.css';
import { connect } from 'react-redux';
import { setCurrency } from '../../redux/actions/currency-actions.js';
import { NavLink } from 'react-router-dom';
import CartOverlay from '../cart-overlay/cart-overlay.js';
import {
  setMiniCartVisible,
  unsetMiniCartVisible,
} from '../../redux/actions/layout-actions.js';
import { ReactComponent as CartImgSvg } from '../../assets/img/cart.svg';
import { ReactComponent as LogoSvg } from '../../assets/img/logo.svg';
import { ReactComponent as SwitcherArrow } from '../../assets/img/switcher-arrow.svg';
import GetCurrenciesQuery from '../../queries/get-currencies-query.js';
import { client } from '@tilework/opus';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isCurrencySwitcherVisible: false,
      data: {
        currencies: [],
      },
    };

    this.handleCurrencyBtnClick =
      this.handleCurrencyBtnClick.bind(this);
  }

  async componentDidMount() {
    const currencies = await client.post(GetCurrenciesQuery());
    this.setState({ data: currencies });
    console.log('state', this.state);
  }

  handleCartButton() {
    this.props.setMiniCartVisible();
  }

  handleHideMiniCart() {
    this.props.unsetMiniCartVisible();
  }

  handleCurrencySwitch(symbol) {
    this.props.setCurrency(symbol);
    this.setState({ isCurrencySwitcherVisible: false });
  }

  handleCurrencyBtnClick() {
    this.setState({
      isCurrencySwitcherVisible:
        !this.state.isCurrencySwitcherVisible,
    });
  }

  render() {
    const { currency } = this.props;
    const { isMiniCartVisible } = this.props;
    const { isCurrencySwitcherVisible } = this.state;
    const { currencies } = this.state.data;
    const { categories } = this.props;
    const { cart } = this.props;

    return (
      <header className="header">
        <nav className="navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-btn-active' : 'nav-btn'
            }
          >
            Home
          </NavLink>
          {categories.map((category) => (
            <NavLink
              to={category.name}
              key={category.name}
              className={({ isActive }) =>
                isActive ? 'nav-btn-active' : 'nav-btn'
              }
            >
              {category.name}
            </NavLink>
          ))}
        </nav>
        <LogoSvg />
        <aside className="header-right-side">
          <button
            onClick={this.handleCurrencyBtnClick}
            className="currency-switcher"
          >
            {currency}
            <SwitcherArrow
              className={
                isCurrencySwitcherVisible
                  ? 'currency-arrow-rotated'
                  : 'currency-arrow'
              }
            >
              ^
            </SwitcherArrow>
          </button>
          <ul
            className={
              isCurrencySwitcherVisible
                ? 'switcher-popup'
                : 'switcher-popup hidden'
            }
          >
            {currencies.map((currency) => (
              <li
                onClick={() => {
                  this.handleCurrencySwitch(currency.symbol);
                }}
                className="currency-element"
                key={currency.label}
              >
                <span>{currency.symbol}</span>
                <span>{currency.label}</span>
              </li>
            ))}
          </ul>
          <button
            className="cart-btn"
            onClick={() => this.handleCartButton()}
          >
            <CartImgSvg />
            {cart.itemsInCart > 0 ? (
              <div className="items-in-cart">{cart.itemsInCart}</div>
            ) : (
              ''
            )}
          </button>
        </aside>
        {isMiniCartVisible ? (
          <>
            <div
              className="cover"
              onClick={() => {
                this.handleHideMiniCart();
              }}
            >
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
            <CartOverlay />
          </>
        ) : (
          ''
        )}
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const currency = state.currency;
  const { isMiniCartVisible } = state.layout;
  const categories = state.categories;
  const cart = state.cart;
  return { currency, isMiniCartVisible, categories, cart };
};
const actionCreators = {
  setCurrency,
  setMiniCartVisible,
  unsetMiniCartVisible,
};

export default connect(mapStateToProps, actionCreators)(Header);
