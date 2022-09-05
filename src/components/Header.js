import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, currency, expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, cur) => {
      acc += +cur.value * +cur.exchangeRates[cur.currency].ask;
      return acc;
    }, 0);

    return (
      <div>
        <label
          htmlFor="email-field"
        >
          <p
            data-testid="email-field"
          >
            {' '}
            Olá,
            { email }
          </p>
        </label>
        <label
          htmlFor="total-field"
          data-testid="total-field"
        >
          Total de despesas
          { totalExpenses.toFixed(2) }
        </label>
        <label
          htmlFor="header-currency-field"
        >
          <span
            data-testid="header-currency-field"
            name="currency-field"
          >
            BRL
            { currency }
          </span>
        </label>

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currency: state.wallet.currency,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
