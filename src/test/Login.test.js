import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Login from '../pages/Login';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const BTN_LOGIN = 'login-submit-btn';
const EMAIL_VALID = 'email@email.com';
const PASSWORD_VALID = '1234567';

describe('1 - Página login com todos os elementos e atributos', () => {
  it('tem os data-tetids', () => {
    render(<Login />);
    screen.getByTestId(EMAIL_INPUT);
    screen.getByTestId(PASSWORD_INPUT);
    screen.getByTestId(BTN_LOGIN);
  });
});

describe('2 - Desenvolver se a pessoa consegue escrever no email', () => {
  it('É possivel escrever o email', () => {
    render(<Login />);

    const input = screen.getByTestId(EMAIL_INPUT);
    fireEvent.change(input, { target: { value: EMAIL_VALID } });
  });
});

describe('3 - Desenvolver se a pessoa consegue escrever na senha', () => {
  it('É possivel escrever a senha', () => {
    render(<Login />);

    const password = screen.getByTestId(PASSWORD_INPUT);
    fireEvent.change(password, { target: { value: PASSWORD_VALID } });
  });
});
describe('4 - Desenvolver um botão só é habilitado após senha e email validos', () => {
  it('So é habilitado quando com senha e email validos', () => {
    render(<Login />);

    const button = screen.getByTestId(BTN_LOGIN);
    expect(button).toBeDisabled();

    const input = screen.getByTestId(EMAIL_INPUT);
    fireEvent.change(input, { target: { value: EMAIL_VALID } });
    const password = screen.getByTestId(PASSWORD_INPUT);
    fireEvent.change(password, { target: { value: PASSWORD_VALID } });
    expect(button).not.toBeDisabled();
  });
  it('Botão desativado após senha invalida', () => {
    render(<Login />);

    const button = screen.getByTestId(BTN_LOGIN);
    expect(button).toBeDisabled();

    const input = screen.getByTestId(EMAIL_INPUT);
    fireEvent.change(input, { target: { value: EMAIL_VALID } });
    const password = screen.getByTestId(PASSWORD_INPUT);
    fireEvent.change(password, { target: { value: '123456' } });
    expect(button).toBeDisabled();
  });
  test('Botão desativado após email invalido', () => {
    render(<Login />);

    const button = screen.getByTestId(BTN_LOGIN);
    expect(button).toBeDisabled();

    const input = screen.getByTestId(EMAIL_INPUT);
    fireEvent.change(input, { target: { value: 'email@email' } });
    const password = screen.getByTestId(PASSWORD_INPUT);
    fireEvent.change(password, { target: { value: PASSWORD_VALID } });
    expect(button).toBeDisabled();
  });
});
