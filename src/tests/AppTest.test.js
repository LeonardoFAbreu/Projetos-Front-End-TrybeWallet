import React from 'react';
import { screen, waitFor } from '@testing-library/react';
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

    const emailTestValidation = 'usuario@email.com';
    const inputEmail = screen.getByTestId(/email-input/i);
    const inputPassword = screen.getByTestId(/password-input/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    expect(enterButton).toBeInTheDocument();
    expect(enterButton).toBeDisabled();

    userEvent.type(inputEmail, emailTestValidation);
    expect(inputEmail.value).toBe(emailTestValidation);
    expect(enterButton).toBeDisabled();

    userEvent.type(inputPassword, 'passwd');
    expect(inputPassword.value).toBe('passwd');

    expect(enterButton).not.toBeDisabled();
  });

  test('if the /Entrar/ button is disabled when the email input is incorrectly filled', () => {
    renderWithRouterAndRedux(<App />, '/');

    const enterButton = screen.getByRole('button', { name: /entrar/i });
    expect(enterButton).toBeDisabled();
    expect(enterButton).toBeInTheDocument();
  });

  test('if clicking on the /Entrar/ button is redirected to <Wallet> page', async () => {
    const { history } = renderWithRouterAndRedux(<App />, '/');

    const userEmail = screen.getByText(/seu e-mail/i);
    userEvent.type(userEmail, 'usuario@email.com');

    const userPasswd = screen.getByText(/sua senha/i);
    userEvent.type(userPasswd, 'senha');

    const enterButton = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(enterButton);

    await waitFor(() => {
      expect(enterButton).toBeInTheDocument();
    });

    const walletPage = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(history.location.pathname).toEqual('/carteira');
    expect(walletPage).toBeInTheDocument();
  });
});
