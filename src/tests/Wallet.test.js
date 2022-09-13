import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import Header from '../components/Header';
import Wallet from '../pages/Wallet';

describe('Testing the /Wallet/ page', () => {
  const INITIAL_STATE = {
    wallet: {
      currencies: Object.keys(mockData).filter((element) => element !== 'USDT'),
      expenses: [
        {
          value: '77',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
          id: 0,
          description: 'almoço',
          exchangeRates: mockData,
        },
        {
          value: '77',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
          id: 1,
          description: 'jantar',
          exchangeRates: mockData,
        },
      ],
    },
  };

  test('if the <Wallet> page is in the path "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
  });

  test('if the user email appears in the Header', () => {
    renderWithRouterAndRedux(<Header />);

    const userEmail = screen.getByTestId('email-field');
    expect(userEmail).toBeInTheDocument();
  });

  test('if it is possible to add expenses', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { store } = renderWithRouterAndRedux(<Wallet />, { INITIAL_STATE });

    userEvent.type(screen.getByTestId('value-input'), '');
    userEvent.type(screen.getByTestId('description-input'), 'blablabla');
    userEvent.click(screen.getByRole('button', { name: /Adicionar despesa/i }));

    expect(await screen.findByText('blablabla')).toBeInTheDocument();
    expect(store.getState().wallet.expenses).toHaveLength(3);
    expect(await screen.findByText('0')).toBeInTheDocument();
  });
});
