import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userInfos, fetchAPI } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      passwd: '',
      isDisabledButton: true, // BOTÃO 'ENTRAR' DEVE ESTAR DESABILITADO
    };
  }

  // VALIDAÇÃO DOS INPUTS INICIAIS
  validEmail = () => {
    const { email } = this.state;

    const EmailFormat = /\S+@\S+\.\S+/; // USANDO ATALHO '/S' REGEX PARA VALIDAR FORMATO DE EMAIL
    return EmailFormat.test(email) && email;
  };

  validPasswd = () => {
    const { passwd } = this.state;

    const passwdMinLength = 6;
    return passwd.length >= passwdMinLength;
  };

  validButton = () => (
    this.setState({ isDisabledButton: !(this.validEmail() && this.validPasswd()) })
  );

  // CAPTURA ENTRADA DOS INPUTS INICIAIS PARA MODIFICAR O ESTADO DELES
  handleChangeInput = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.validButton());
  };

  // ALTERA ROTA PARA 'CARTEIRA' DEPOIS QUE O BOTÃO 'ENTRAR' É CLICADO
  handleSubmit = async (event) => {
    event.preventDefault();

    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(userInfos(email));
    await dispatch(fetchAPI());
    history.push('/carteira');
  };

  render() {
    const { isDisabledButton, email, passwd } = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
        <div
          data-testId="login-page"
        >
          <h1>TrybeWallet</h1>
          <label htmlFor="email">
            <p>Seu e-mail</p>
            <input
              data-testid="email-input"
              id="Email"
              name="email"
              onChange={ this.handleChangeInput }
              type="text"
              value={ email }
            />
          </label>
          <label htmlFor="passwd">
            <p>Sua senha</p>
            <input
              // required
              data-testid="password-input"
              id="Passwd"
              name="passwd"
              onChange={ this.handleChangeInput }
              type="text"
              value={ passwd }
            />
          </label>
        </div>
        <div>
          <button
            disabled={ isDisabledButton }
            id="submit-button"
            name="entrar"
            onClick={ this.handleSubmit }
            type="submit"
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(
    { push: PropTypes.func.isRequired },
  ).isRequired,
  dispatch: PropTypes.func }.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Login);
