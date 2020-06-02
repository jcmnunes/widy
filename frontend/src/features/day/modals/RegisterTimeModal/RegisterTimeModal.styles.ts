import { Input, Modal, ModalFooter } from '@binarycapsule/ui-capsules';
import styled from 'styled-components/macro';

export const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  color: ${props => props.theme.neutral500};

  span {
    margin: 0 12px 0 6px;
  }
`;

export const StyledInput = styled(Input)`
  width: 68px;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledModal = styled(Modal)`
  overflow: visible;
`;

export const StyledModalFooter = styled(ModalFooter)`
  border-radius: 16px;
`;

export const H3 = styled.h3`
  margin-top: 12px;
  margin-bottom: 4px;
`;
