import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { connect } from 'react-redux';
import {
  setEuro,
  setYen,
  setDollar,
} from '../../redux/actions/currency-actions.js';

class Header extends React.Component {
  render() {
    const currency = this.props.currency;
    const setEuro = this.props.setEuro;
    const setDollar = this.props.setDollar;
    return (
      <header>
        <nav className="navigation">
          <Link to="tech">Tech</Link>
          <Link to="clothes">Clothes</Link>
        </nav>
        <aside>{currency}</aside>
        <button onClick={setEuro}>Set Euro</button>
        <button onClick={setDollar}>Set Dollar</button>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const currency = state.currency;
  return { currency };
};
const actionCreators = {
  setEuro,
  setYen,
  setDollar,
};

export default connect(mapStateToProps, actionCreators)(Header);
