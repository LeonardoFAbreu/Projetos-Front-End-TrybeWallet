import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';

describe('Testing the /Wallet/ page', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });
  });

  test('if the <Wallet> page is in the path "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
  });

  test('if the total amount of expenses informed appears in the Header', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, '/carteira');

    store.dispatch(fetchAPI());
    const walletForm = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(walletForm).toBeInTheDocument();
    await waitFor(() => {
      const state = store.getState();
      expect(state.wallet.currencies.length).toBeGreaterThan(0);
    });

    const inputValue = screen.getByTestId('value-input');
    userEvent.type(inputValue, '2');

    const currencyType = screen.getByLabelText(/tipo de moeda/i);
    userEvent.selectOptions(currencyType, 'USD');

    const addExpButton = screen.getByText(/adicionar despesa/i);
    userEvent.click(addExpButton);
    await waitFor(() => {
      const totalField = screen.getAllByText('9.51');
      expect(totalField[0].innerHTML).toBe('9.51');
    });

    const deleteButton = screen.getByTestId('delete-btn');
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);
    expect(deleteButton).not.toBeInTheDocument();
  });
});
