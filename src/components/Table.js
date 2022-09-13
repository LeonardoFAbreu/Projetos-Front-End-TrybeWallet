import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpenses } from '../redux/actions/index';

class Table extends React.Component {
  // handleClickSubmit = (event) => {
  //   const { expenses, dispatch } = this.props;
  //   event.preventDefault();
  //   const itensList = expenses.filter((expense) => +expense.id !== +event.target.id);
  //   dispatch(removeExpenses(itensList));
  // };

  render() {
    const { expenses, dispatch } = this.props;

    return (
      <table>
        <thead>
          <th scope="col">Descrição</th>
          <th scope="col">Tag</th>
          <th scope="col">Método de pagamento</th>
          <th scope="col">Valor</th>
          <th scope="col">Moeda</th>
          <th scope="col">Câmbio utilizado</th>
          <th scope="col">Valor convertido</th>
          <th scope="col">Moeda de conversão</th>
          <th scope="col">Editar/Excluir</th>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>
                {
                  expense.description
                }
              </td>
              <td>
                {
                  expense.tag
                }
              </td>
              <td>
                {
                  expense.method
                }
              </td>
              <td>
                {
                  expense.value === '' ? '0' : parseFloat(expense.value)
                    .toFixed(2)
                }
              </td>
              <td>
                {
                  expense.exchangeRates[expense.currency].name
                }
              </td>
              <td>
                {
                  parseFloat(expense.exchangeRates[expense.currency]
                    .ask).toFixed(2)
                }
              </td>
              <td>
                {
                  parseFloat(expense.exchangeRates[expense.currency].ask * expense.value)
                    .toFixed(2)
                }
              </td>
              <td>Real brasileiro</td>
              <td>
                <button
                  data-testid="delete-btn"
                  name="delete"
                  onClick={ () => dispatch(removeExpenses(expense.id)) }
                  type="submit"
                >
                  Excluir
                </button>
              </td>
            </tr>)) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
