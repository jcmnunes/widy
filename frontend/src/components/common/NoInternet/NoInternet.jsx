import React from 'react';
import styled from 'styled-components/macro';
import { Icon24, Modal, ModalBody, theme } from '@binarycapsule/ui-capsules';
import { Offline } from 'react-detect-offline';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 28px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${props => props.theme.neutral600};
  text-align: center;
`;

const SubTitle = styled.h2`
  font-size: 16px;
  color: ${props => props.theme.neutral400};
  text-align: center;
  margin-top: 12px;
  line-height: 20px;
`;

const NoInternet = () => (
  <Offline>
    <Modal contentLabel="Offline-modal" isOpen width="340px">
      <ModalBody>
        <Content>
          <Icon24
            icon="WIFI_OFF"
            primaryColor={theme.neutral300}
            secondaryColor={theme.red500}
            size="138px"
          />
          <Title>No internet connection</Title>
          <SubTitle>
            Please, make sure you have an internet connection to continue using Widy
          </SubTitle>
        </Content>
      </ModalBody>
    </Modal>
  </Offline>
);

export default NoInternet;
