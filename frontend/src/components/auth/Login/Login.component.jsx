import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Message, Input } from '@binarycapsule/ui-capsules';
import Link from '../../common/Link/Link';
import { Footer, FormContainer, InputField, StyledForm, Title } from './Login.styles';

class LoginComponent extends Component {
  state = {
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  componentWillUnmount() {
    this.props.resetLoginError();
  }

  handleOnChange = e => {
    // Reset errors from BE
    const { loginError, resetLoginError } = this.props;
    if (loginError.length > 0) {
      resetLoginError();
    }

    // Reset sync validation
    const { emailError, passwordError } = this.state;
    const errors = { emailError: '', passwordError: '' };
    if (emailError.length > 0 || passwordError.length > 0) {
      this.setState({ ...errors });
    }

    // Update state
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { loginRequest } = this.props;
    this.validate(() => {
      if (this.isFormValid()) {
        loginRequest({
          email: this.state.email,
          password: this.state.password,
        });
      }
    });
  };

  validate = cb => {
    const { email, password } = this.state;
    const errors = { emailError: '', passwordError: '' };
    if (email.length === 0) {
      errors.emailError = 'You need to provide your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.emailError = 'Invalid email address';
    }
    if (password.length === 0) {
      errors.passwordError = 'You need to provide your password';
    }
    return this.setState({ ...errors }, cb);
  };

  isFormValid = () => {
    const { email, emailError, password, passwordError } = this.state;
    return (
      emailError.length === 0 &&
      passwordError.length === 0 &&
      email.length > 0 &&
      password.length > 0
    );
  };

  render() {
    const { loading, loginError } = this.props;
    const { emailError, passwordError } = this.state;
    return (
      <FormContainer>
        <StyledForm onSubmit={this.handleSubmit}>
          <Title>Login to your account</Title>
          {loginError.length > 0 && (
            <Message appearance="error" style={{ marginBottom: 24 }}>
              {loginError}
            </Message>
          )}
          <InputField>
            Email:
            <Input
              placeholder="you@example.com"
              value={this.state.email}
              name="email"
              type="text"
              error={emailError}
              inputSize="large"
              onChange={this.handleOnChange}
            />
          </InputField>
          <InputField>
            Password:
            <Input
              placeholder="Enter your password"
              value={this.state.password}
              name="password"
              type="password"
              error={passwordError}
              inputSize="large"
              onChange={this.handleOnChange}
            />
          </InputField>
          <Button type="submit" appearance="primary" size="large" isLoading={loading} isBlock>
            Login
          </Button>
        </StyledForm>
        <Footer>
          <Link to="/forgot">Forgot password?</Link>
        </Footer>
      </FormContainer>
    );
  }
}

LoginComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  loginError: PropTypes.string.isRequired,
  loginRequest: PropTypes.func.isRequired,
  resetLoginError: PropTypes.func.isRequired,
};

export default LoginComponent;
