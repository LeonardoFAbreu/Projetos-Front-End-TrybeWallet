import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

describe('Testing login page', () => {
  test('If there is a paragraph with the text /Seu e-mail/', () => {
    renderWithRouter(<Login />);
    const emailLabel = screen.getByText(/seu e-mail/i);
    expect(emailLabel).toBeInTheDocument();
  });

  test('If there is a paragraph with the text /Sua senha/', () => {
    renderWithRouter(<Login />);
    const passwdLabel = screen.getByText(/sua senha/i);
    expect(passwdLabel).toBeInTheDocument();
  });

  test('If there is an /enter/ button', () => {
    renderWithRouter(<Login />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });
});

describe('Wallet page components', () => {
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
});
