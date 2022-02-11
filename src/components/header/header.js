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
    const OPTIONS = ['USD', 'GBP', 'AUD', 'JPY', 'RUB'];

    const handleCurrencyChange = (event) =>
      event.target.value === 'USD'
        ? setDollar()
        : event.target.value === 'GBP'
        ? setPound()
        : event.target.value === 'AUD'
        ? setAussieDollar()
        : event.target.value === 'JPY'
        ? setYen()
        : setRuble();

    return (
      <header className="header">
        <nav className="navigation">
          <Link to="/tech">Tech</Link>
          <Link to="/clothes">Clothes</Link>
        </nav>
        <aside className="currency">
          <select value={currency} onChange={handleCurrencyChange}>
            {OPTIONS.map((elem) => (
              <option key={elem}>{elem}</option>
            ))}
          </select>
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
