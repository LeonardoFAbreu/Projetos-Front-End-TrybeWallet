import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testing de <App> component', () => {
  test('if the App starts with path "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  test('if the application contains the email and password fields, and title on the screen', () => {
    renderWithRouterAndRedux(<App />);

    const emailLabel = screen.getByText(/Seu e-mail/i);
    expect(emailLabel).toBeInTheDocument();

    const passwdLabel = screen.getByText(/Sua senha/i);
    expect(passwdLabel).toBeInTheDocument();

    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();

    const title = screen.getAllByText(/TrybeWallet/i);
    expect(title[0]).toBeInTheDocument();
  });

  test('if when filling in the inputs correctly, the /Entrar/ button is enabled', () => {
    renderWithRouterAndRedux(<App />);

    const enterButton = screen.getByRole('button', { name: /entrar/i });
    const emailLabel = screen.getByTestId('email-input');
    const passwdLabel = screen.getByTestId('password-input');
    const emailtest = 'usuario@email.com';
    const senhatest = 'senha123';

    userEvent.type(emailLabel, emailtest);
    userEvent.type(passwdLabel, senhatest);

    expect(enterButton).toBeEnabled();
  });

  test('if the /Entrar/ button is disabled when loading the Login screen', () => {
    renderWithRouterAndRedux(<App />, '/');

    const enterButton = screen.getByRole('button', { name: /entrar/i });
    expect(enterButton).toBeDisabled();
    expect(enterButton).toBeInTheDocument();
  });

  test('if clicking on the /Entrar/ button is redirected to <Wallet> page', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const enterButton = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByTestId('email-input');
    const passwdInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'usuario@email.com');
    userEvent.type(passwdInput, 'senha123');
    userEvent.click(enterButton);
    expect(history.location.pathname).toBe('/carteira');
  });
});
