import React from 'react';
import { Icon24 } from '@binarycapsule/ui-capsules';
import LogoComponent from '../Logo/Logo.component';
import { Container, IconWrapper, Item, ItemDescription, ItemTitle, Title } from './Hero.styles';

const HeroComponent = () => (
  <Container>
    <LogoComponent />
    <Title>What I Did Yesterday?</Title>
    <Item>
      <IconWrapper>
        <Icon24 icon="CHART" size="32px" />
      </IconWrapper>
      <div>
        <ItemTitle>Keep track of what you do</ItemTitle>
        <ItemDescription>Widy helps you track your daily work.</ItemDescription>
      </div>
    </Item>
    <Item>
      <IconWrapper>
        <Icon24 icon="TIME" size="32px" />
      </IconWrapper>
      <div>
        <ItemTitle>Stay in the flow</ItemTitle>
        <ItemDescription>Widy helps you manage your time and stay focused.</ItemDescription>
      </div>
    </Item>
    <Item>
      <IconWrapper>
        <Icon24 icon="SURVEY" size="32px" />
      </IconWrapper>
      <div>
        <ItemTitle>Get handy reports easily</ItemTitle>
        <ItemDescription>Widy will generate reports for you automatically.</ItemDescription>
      </div>
    </Item>
  </Container>
);

export default HeroComponent;
