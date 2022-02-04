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
    const setPound = this.props.setPound;
    const setDollar = this.props.setDollar;
    return (
      <header>
        <nav className="navigation">
          <Link to="tech">Tech</Link>
          <Link to="clothes">Clothes</Link>
        </nav>
        <aside>{currency}</aside>
        <button onClick={setDollar}>Set Dollar</button>
        <button onClick={setPound}>Set Pound</button>
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
