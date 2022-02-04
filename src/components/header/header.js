import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { connect } from 'react-redux';
import {
  setDollar,
  setPound,
  setAussieDollar,
  setYen,
  setRuble,
} from '../../redux/actions/currency-actions.js';

class Header extends React.Component {
  render() {
    const currency = this.props.currency;
    const setDollar = this.props.setDollar;
    const setPound = this.props.setPound;
    const setAussieDollar = this.props.setAussieDollar;
    const setYen = this.props.setYen;
    const setRuble = this.props.setRuble;
    const OPTIONS = ['USD', 'GBP', 'AUD', 'JPY', 'RUB'];

    const handleChange = (event) =>
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
      <header>
        <nav className="navigation">
          <Link to="tech">Tech</Link>
          <Link to="clothes">Clothes</Link>
        </nav>
        <aside className="currency">
          <select value={currency} onChange={handleChange}>
            {OPTIONS.map((elem) => (
              <option key={elem}>{elem}</option>
            ))}
          </select>
        </aside>
        {/* <button onClick={setDollar}>Set Dollar</button>
        <button onClick={setPound}>Set Pound</button> */}
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
