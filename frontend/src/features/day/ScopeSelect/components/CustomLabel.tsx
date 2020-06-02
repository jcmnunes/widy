import React from 'react';
import styled from 'styled-components/macro';

const StyledLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Code = styled.span`
  text-transform: uppercase;
  color: ${props => props.theme.neutral300};
`;

const Name = styled.div`
  flex: 1;
`;

interface Props {
  label: string;
  shortCode: string;
}

export const CustomLabel: React.FC<Props> = ({ label, shortCode }) => {
  return (
    <StyledLabel>
      <Name>{label}&nbsp;</Name>
      <Code>{shortCode}</Code>
    </StyledLabel>
  );
};
