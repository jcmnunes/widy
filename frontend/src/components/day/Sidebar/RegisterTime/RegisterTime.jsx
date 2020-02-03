import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Button } from '@binarycapsule/ui-capsules';
import { REGISTER_TIME } from '../../../modals/types';

const StyledInsertTime = styled.div`
  margin-top: 12px;
`;

const RegisterTime = ({ canRegisterTime, openModal }) => {
  const handleOnClick = () => openModal(REGISTER_TIME);

  return canRegisterTime ? (
    <StyledInsertTime>
      <Button iconBefore="TIME" onClick={handleOnClick}>
        Register Time
      </Button>
    </StyledInsertTime>
  ) : null;
};

RegisterTime.propTypes = {
  canRegisterTime: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default RegisterTime;
