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
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const currency = this.props.currency;
    const setDollar = this.props.setDollar;
    const setPound = this.props.setPound;
    const setAussieDollar = this.props.setAussieDollar;
    const setYen = this.props.setYen;
    const setRuble = this.props.setRuble;
    const OPTIONS = ['$', '£', 'A$', '¥', '₽'];

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
          <Link to="/tech">Tech</Link>
          <Link to="/clothes">Clothes</Link>
        </nav>
        <aside className="header-left-side">
          <select value={currency} onChange={handleCurrencyChange}>
            {OPTIONS.map((elem) => (
              <option key={elem}>{elem}</option>
            ))}
          </select>
          <Link to="/cart">🛒</Link>
        </aside>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const currency = state.currency;

  return { currency };
};
const actionCreators = {
  setDollar,
  setPound,
  setAussieDollar,
  setYen,
  setRuble,
};

export default connect(mapStateToProps, actionCreators)(Header);
