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
import {
  setCategoryTech,
  setCategoryClothes,
} from '../../redux/actions/category-actions.js';

class Header extends React.Component {
  render() {
    const currency = this.props.currency;
    const setDollar = this.props.setDollar;
    const setPound = this.props.setPound;
    const setAussieDollar = this.props.setAussieDollar;
    const setYen = this.props.setYen;
    const setRuble = this.props.setRuble;
    const setTech = this.props.setCategoryTech;
    const setClothes = this.props.setCategoryClothes;
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
      <header>
        <nav className="navigation">
          {/* <Link to="tech">Tech</Link>
          <Link to="clothes">Clothes</Link> */}
          <button onClick={setTech}>Tech</button>
          <button onClick={setClothes}>Clothes</button>
        </nav>
        <aside className="currency">
          <select value={currency} onChange={handleCurrencyChange}>
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
  setCategoryTech,
  setCategoryClothes,
};

export default connect(mapStateToProps, actionCreators)(Header);