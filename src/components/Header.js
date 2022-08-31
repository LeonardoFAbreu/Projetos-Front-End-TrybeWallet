import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenseValue, exchange, currencies } = this.props;
    const method = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const category = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <div>
        <label htmlFor="user_email">
          <p
            data-testid="email-field"
          >
            { email }
          </p>
        </label>
        <label htmlFor="currencies">
          Qual a moeda?
          <select
            data-testid="currency-input"
          >
            { currencies.map((currency) => (
              <option key={ currency }>
                {' '}
                { currency }
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="total_expense"
          data-testid="total-field"
        >
          { Number(expenseValue).toFixed(2) }
        </label>
        <label htmlFor="exchange_used">
          <span
            data-testid="header-currency-field"
          >
            { exchange }
          </span>
        </label>
        <label htmlFor="method">
          Qual a forma de pagamento?
          <select
            data-testid="method-input"
          >
            { method.map((payment) => (
              <option key={ payment }>
                { payment }
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="category">
          Qual o tipo de despesa?
          <select
            data-testid="tag-input"
          >
            { category.map((type) => (
              <option key={ type }>
                { type }
              </option>
            )) }
          </select>
        </label>
        {/* <label htmlFor="add-expense">
            <button
              type="submit"
              name="Adicionar despesa"
              value="Adicionar despesa"
              onClickSubmit={}
              // disabled={ }
            >
              Adicionar despesa
            </button>
          </label> */}
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenseValue: PropTypes.number.isRequired,
  exchange: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenseValue: Number(state.wallet.expenseValue),
  exchange: state.wallet.exchange,
});

export default connect(mapStateToProps)(Header);
