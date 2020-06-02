import React from 'react';
import Hero from '../Hero/Hero.component';
import Login from '../Login/Login.container';
import LogoComponent from '../Logo/Logo.component';
import { Container, Form, LogoWrapper, StyledCard } from './LoginCard.styles';

const LoginCardComponent = () => (
  <Container>
    <LogoWrapper>
      <LogoComponent />
    </LogoWrapper>
    <StyledCard>
      <Hero />
      <Form>
        <Login />
      </Form>
    </StyledCard>
  </Container>
);

export default LoginCardComponent;
