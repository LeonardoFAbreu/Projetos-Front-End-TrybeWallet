import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';
import App from '../App';

describe('Testing de /App/ component', () => {
  test('if the Login page is rendered when the path is /', () => {
    renderWithRouter(<App />);
    const loginPage = screen.getByTestId('login-page');
    expect(loginPage).toBeInTheDocument();
  });

  test('if the Wallet page is rendered when the path is /carteira', () => {
    renderWithRouter(<App />, { initialEntries: ['/carteira'] });
    const walletPage = screen.getByTestId('wallet-page');
    expect(walletPage).toBeInTheDocument();
  });

  test('If there is an /Entrar/ button', () => {
    renderWithRouter(<App />);
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    expect(enterButton).toBeInTheDocument();
  });

  test('/Entrar/ button validation', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    userEvent.type(emailInput, 'teste@email.com');

    const passwordInput = screen.getByText(/senha/i);
    userEvent.type(passwordInput, '147852');
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeEnabled();
  });

  test('if clicking on the /Entrar/ button is redirected to /carteira page', () => {
    const { history } = renderWithRouter(<App />);

    const enterButton = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(enterButton);
    expect(history.location.pathname).toEqual('/');
  });
});

describe('Testing Login page', () => {
  test('if the page contains an h1 heading with the text /TrybeWallet/', () => {
    renderWithRouter(<Login />);
    const loginTitle = screen.getByRole('heading', { level: 1, name: /trybewallet/i });
    expect(loginTitle).toBeInTheDocument();
  });

  test('If there is a paragraph with the text /Seu e-mail/', () => {
    renderWithRouter(<Login />);
    const emailLabel = screen.getByText(/seu e-mail/i);
    expect(emailLabel).toBeInTheDocument();
  });

  test('If there is a input field below the email label', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  test('If there is a input field below the password label', () => {
    renderWithRouter(<Login />);
    const passwdInput = screen.getByTestId('password-input');
    expect(passwdInput).toBeInTheDocument();
  });

  test('If there is a paragraph with the text /Sua senha/', () => {
    renderWithRouter(<Login />);
    const passwdLabel = screen.getByText(/sua senha/i);
    expect(passwdLabel).toBeInTheDocument();
  });
});

describe('Testing Wallet page', () => {
  test('if the page contains an h2 heading with the text /TrybeWallet/', () => {
    renderWithRouter(<Wallet />);
    const walletTitle = screen.getByRole('heading', { level: 2, name: /trybewallet/i });
    expect(walletTitle).toBeInTheDocument();
  });

  test('if there is an /descrição da despesa/ field with /data-testid=description-input/', () => {
    renderWithRouter(<Wallet />);
    const descriptionField = screen.getByTestId(/description-input/i);
    expect(descriptionField).toBeInTheDocument();
  });

  test('If there is an /adicionar despesa/ button', () => {
    renderWithRouter(<Wallet />);
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addButton).toBeInTheDocument();
    userEvent.click(addButton);
  });

  test('if there is a table on the page', () => {
    renderWithRouter(<Wallet />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});
