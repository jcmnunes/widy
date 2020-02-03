import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Message, Input, Button } from '@binarycapsule/ui-capsules';
import Link from '../../common/Link/Link';
import LogoComponent from '../Logo/Logo.component';
import { Container, Footer, Helper, InputField, StyledForm, Title } from './Reset.styles';

class Reset extends Component {
  state = {
    password: '',
    confirm: '',
    passwordError: '',
    confirmError: '',
  };

  componentWillUnmount() {
    this.props.resetResetError();
  }

  handleOnChange = e => {
    // Reset errors from BE
    const { error, resetResetError } = this.props;
    if (error.length > 0) {
      resetResetError();
    }

    // Reset sync validation
    const { passwordError, confirmError } = this.state;
    const errors = { passwordError: '', confirmError: '' };
    if (passwordError.length > 0 || confirmError > 0) {
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
    const { resetRequest } = this.props;
    this.validate(() => {
      if (this.isFormValid()) {
        const { password, confirm } = this.state;
        const { token } = this.props.match.params;
        resetRequest({ password, confirm, token });
      }
    });
  };

  validate = cb => {
    const { password, confirm } = this.state;
    const errors = { passwordError: '', confirmError: '' };
    if (password.length === 0) {
      errors.passwordError = 'You need to provide a new password';
    }
    if (password.length < 5) {
      errors.passwordError = 'Your password must be at least 5 characters long';
    }
    if (confirm.length === 0) {
      errors.confirmError = 'Please confirm your new password';
    }
    if (password !== confirm) {
      errors.confirmError = 'Passwords do not match';
    }
    return this.setState({ ...errors }, cb);
  };

  isFormValid = () => {
    const { password, passwordError, confirm, confirmError } = this.state;
    return (
      passwordError.length === 0 &&
      confirmError.length === 0 &&
      password.length > 0 &&
      confirm.length > 0
    );
  };

  render() {
    const { loading, error } = this.props;
    const { passwordError, confirmError } = this.state;
    return (
      <Container>
        <LogoComponent />
        <StyledForm onSubmit={this.handleSubmit}>
          <Title>Reset your password</Title>
          <Helper>Choose a new password for your account.</Helper>
          {error.length > 0 && (
            <Message appearance="error" style={{ marginBottom: 24 }}>
              {error}
            </Message>
          )}
          <InputField>
            New password:
            <Input
              value={this.state.password}
              name="password"
              type="password"
              error={passwordError}
              size="large"
              onChange={this.handleOnChange}
            />
          </InputField>
          <InputField>
            Confirm new password:
            <Input
              value={this.state.confirm}
              name="confirm"
              type="password"
              error={confirmError}
              size="large"
              onChange={this.handleOnChange}
            />
          </InputField>
          <Button type="submit" appearance="primary" size="large" isLoading={loading} isBlock>
            Change password
          </Button>
          <Footer>
            <Link to="/login">Back to Login</Link>
          </Footer>
        </StyledForm>
      </Container>
    );
  }
}

Reset.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
  resetRequest: PropTypes.func.isRequired,
  resetResetError: PropTypes.func.isRequired,
};

export default withRouter(Reset);
