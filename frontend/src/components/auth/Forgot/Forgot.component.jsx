import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Message } from '@binarycapsule/ui-capsules';
import Link from '../../common/Link/Link';
import { Container, Footer, Helper, StyledForm, Title, InputField } from './Forgot.styles';
import Logo from '../Logo/Logo.component';

class Forgot extends Component {
  state = {
    email: '',
    emailError: '',
  };

  componentWillUnmount() {
    const { resetForgotMessage } = this.props;
    resetForgotMessage();
  }

  handleOnChange = e => {
    // Reset sync validation
    const { emailError } = this.state;
    const errors = { emailError: '' };
    if (emailError.length > 0) {
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
    const { forgotRequest } = this.props;
    this.validate(() => {
      if (this.isFormValid()) {
        const { email } = this.state;
        forgotRequest({ email });
      }
    });
  };

  validate = cb => {
    const { email } = this.state;
    const errors = { emailError: '' };
    if (email.length === 0) {
      errors.emailError = 'You need to provide your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.emailError = 'Invalid email address';
    }
    return this.setState({ ...errors }, cb);
  };

  isFormValid = () => {
    const { email, emailError } = this.state;
    return emailError.length === 0 && email.length > 0;
  };

  render() {
    const { loading, message } = this.props;
    const { emailError } = this.state;
    return (
      <Container>
        <Logo />
        <StyledForm onSubmit={this.handleSubmit}>
          <Title>Forgot password?</Title>
          <Helper>
            Enter your email address below. We’ll email instructions on how to reset your password.
          </Helper>
          {message.length > 0 && (
            <Message appearance="success" style={{ marginBottom: 24 }}>
              {message}
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
              size="large"
              onChange={this.handleOnChange}
            />
          </InputField>
          <Button type="submit" appearance="primary" size="large" isLoading={loading} isBlock>
            Reset password
          </Button>
          <Footer>
            <Link to="/login">Back to Login</Link>
          </Footer>
        </StyledForm>
      </Container>
    );
  }
}

Forgot.propTypes = {
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  forgotRequest: PropTypes.func.isRequired,
  resetForgotMessage: PropTypes.func.isRequired,
};

export default Forgot;
