import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userInfos } from '../redux/actions/index';

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
  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(userInfos(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabledButton } = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
        <div>
          <label htmlFor="email">
            <p>Seu e-mail</p>
            <input
              data-testid="email-input"
              type="text"
              name="email"
              onChange={ this.handleChangeInput }
            />
          </label>
          <label htmlFor="passwd">
            <p>Sua senha</p>
            <input
              required
              data-testid="password-input"
              type="text"
              name="passwd"
              onChange={ this.handleChangeInput }
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            name="entrar"
            disabled={ isDisabledButton }
            onClick={ this.handleSubmit }
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

export default connect()(Login);
