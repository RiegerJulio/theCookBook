import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { setLocalStorage } from '../services/localStorage';

import './css/login.css';
import LogoMockup from '../images/logo-testes1.png';

const SIX = 6;

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyButton, setVerifyButton] = useState(true);

  const validateEmail = (verifyEmail) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(verifyEmail);
  };

  useEffect(() => {
    if (validateEmail(email) && password.length > SIX) {
      setVerifyButton(false);
    } else {
      setVerifyButton(true);
    }
  }, [email, password]);

  const onButtonClick = () => {
    const { history } = props;
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('user', { email });
    history.push('/foods');
  };

  return (
    <div className="login-container">
      <img src={ LogoMockup } alt="logo" className="img-teste" />
      <form action="" className="login-fields">
        <div className="input-field">
          <label htmlFor="email" />
          <p className="paragraph-input">Email</p>
          <input
            id="email"
            type="email"
            className="validate"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            data-testid="email-input"
            autoComplete='Email'
          />
        </div>
        <div className="input-field">
          <label htmlFor="password" />
          <p className="paragraph-input">Password</p>
          <input
            id="password"
            type="password"
            className="validate"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            data-testid="password-input"
            autoComplete='current-password'
          />
        </div>
        <button
          className="waves-effect waves-light btn lime darken-4"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ verifyButton }
          onClick={ () => onButtonClick() }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;
