import React from 'react';
import './header.css';
import { connect } from 'react-redux';
import {
  setDollar,
  setPound,
  setAussieDollar,
  setYen,
  setRuble,
} from '../../redux/actions/currency-actions.js';
import { NavLink } from 'react-router-dom';
import CartOverlay from '../cart-overlay/cart-overlay.js';
import {
  setMiniCartVisible,
  unsetMiniCartVisible,
} from '../../redux/actions/layout-actions.js';
import { ReactComponent as CartImgSvg } from '../../assets/img/cart.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = { isMiniCartVisible: false };
  }

  handleCartButton() {
    this.props.setMiniCartVisible();
  }

  handleHideMiniCart() {
    this.props.unsetMiniCartVisible();
  }

  render() {
    const currency = this.props.currency;
    const setDollar = this.props.setDollar;
    const setPound = this.props.setPound;
    const setAussieDollar = this.props.setAussieDollar;
    const setYen = this.props.setYen;
    const setRuble = this.props.setRuble;
    const isMiniCartVisible = this.props.isMiniCartVisible;
    const OPTIONS = ['$', '£', 'A$', '¥', '₽'];
    const categories = this.props.categories;
    const cart = this.props.cart;

    const handleCurrencyChange = (event) =>
      event.target.value === '$'
        ? setDollar()
        : event.target.value === '£'
        ? setPound()
        : event.target.value === 'A$'
        ? setAussieDollar()
        : event.target.value === '¥'
        ? setYen()
        : setRuble();

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
        <aside className="header-right-side">
          <select
            className="currency-switch"
            value={currency}
            onChange={handleCurrencyChange}
          >
            {OPTIONS.map((elem) => (
              <option key={elem}>{elem}</option>
            ))}
          </select>
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
  setDollar,
  setPound,
  setAussieDollar,
  setYen,
  setRuble,
  setMiniCartVisible,
  unsetMiniCartVisible,
};

export default connect(mapStateToProps, actionCreators)(Header);
