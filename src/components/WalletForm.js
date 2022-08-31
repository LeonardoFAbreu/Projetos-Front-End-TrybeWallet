import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="description-input">
            Descrição da despesa
            <textarea
              data-testid="description-input"
              type="text"
              name="descrição"
            />
          </label>
          <label htmlFor="value-input">
            Total de despesas
            <input
              data-testid="value-input"
              type="text"
              name="valor"
            />
          </label>
        </form>
      </div>
    );
  }
}

export default WalletForm;
