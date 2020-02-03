import styled, { keyframes } from 'styled-components/macro';

const getColors = props => {
  const colors = {
    border: props.theme.neutral200,
    background: 'white',
  };

  if (props.isCompleted) {
    colors.border = props.theme.neutral100;
  }

  if (props.isSelected) {
    colors.border = props.theme.yellow500;
    colors.background = props.theme.yellow050;
  }

  if (props.isInBreak) {
    colors.border = props.theme.blue200;
  }

  if (props.isDragging) {
    colors.background = props.theme.blue050;
    colors.border = props.theme.blue050;
  }

  return colors;
};

const pulseAnimationIsActive = props => keyframes`
  from {
    border-color: ${props.theme.yellow100};
    box-shadow: 0 0 0 4px ${props.theme.yellow050};
  }

  to {
    border-color: ${props.theme.yellow700};
    box-shadow: 0 0 0 4px ${props.theme.yellow200};
  }
`;

const pulseAnimationInBreak = props => keyframes`
  from {
    border-color: ${props.theme.blue050};
    box-shadow: 0 0 0 4px ${props.theme.blue050};
  }

  to {
    border-color: ${props.theme.blue400};
    box-shadow: 0 0 0 4px ${props.theme.blue100};
  }
`;

const getAnimation = props => {
  if (props.isInBreak) return pulseAnimationInBreak(props);
  if (props.isActive) return pulseAnimationIsActive(props);
  return null;
};

export const StyledCopyButton = styled.div`
  display: none;
  height: 24px;
`;

export const StyledTask = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  border: ${props => `1px solid ${getColors(props).border}`};
  border-radius: 4px;
  background-color: ${props => getColors(props).background};
  padding: 8px;
  font-size: 16px;
  margin: 4px 0;
  color: ${props => (props.isCompleted ? props.theme.neutral300 : props.theme.neutral700)};
  cursor: pointer;
  animation: ${props => getAnimation(props)};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  &:hover {
    background-color: ${props =>
      props.isSelected ? props.theme.yellow075 : props.theme.neutral025};

    ${StyledCopyButton} {
      display: block;
    }
  }
`;

export const TaskTitle = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 0;
  margin-right: 16px;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    margin-left: 4px;
  }
`;

export const Control = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.neutral100};
  }
`;
