import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, addExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Lazer',
    description: '',
    exchangeRates: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState((prev) => ({ ...prev,
      [name]: value }));
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { id } = this.state;
    const resultAPI = await dispatch(fetchAPI());
    this.setState({
      exchangeRates: resultAPI.responseAPIWithAddButton,
    });

    dispatch(addExpenses(this.state));
    this.setState({
      id: id + 1,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      description: '',
      exchangeRates: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const howMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const howTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label
            htmlFor="currencies"
          >
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((element) => (
                <option
                  key={ element }
                  value={ element }
                >
                  {' '}
                  { element }
                </option>
              )) }
            </select>
          </label>
          <label
            htmlFor="method"
          >
            Qual a forma de pagamento?
            <select
              data-testid="method-input"
              name="method"
              id="method"
              value={ method }
              onChange={ this.handleChange }
            >
              { howMethod.map((element) => (
                <option
                  key={ element }
                  value={ element }
                >
                  { element }
                </option>
              )) }
            </select>
          </label>
          <label
            htmlFor="category"
          >
            Qual o tipo da despesa?
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              { howTag.map((type) => (
                <option
                  key={ type }
                  value={ type }
                >
                  { type }
                </option>
              )) }
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição da despesa
            <textarea
              data-testid="description-input"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            name="submit"
            // value={ addExpenses }
            onClick={ this.handleClick }
            // disabled={ }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
