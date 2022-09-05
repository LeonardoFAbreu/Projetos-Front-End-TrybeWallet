import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <th scope="col">Descrição</th>
          <th scope="col">Tag</th>
          <th scope="col">Método de pagamento</th>
          <th scope="col">valor</th>
          <th scope="col">Moeda</th>
          <th scope="col">Câmbio utilizado</th>
          <th scope="col">Valor convertido</th>
          <th scope="col">Moeda de conversão</th>
          <th scope="col">Editar/Excluir</th>
        </thead>
        <tbody>
          { expenses.map((expense, index) => (
            <tr key={ index }>
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
              <td>Editar/Excluir</td>
            </tr>)) }
        </tbody>
      </table>

    // <tr>
    //   <td>
    //     <button
    //     data-testid="delete-btn"
    //     onClick={}
    //     >
    //       Excluir
    //     </button>
    //   </td>
    // </tr>

    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
