import styled, { css } from 'styled-components/macro';
import { Theme } from '@binarycapsule/ui-capsules/dist/types';
import { IconRightThickArrow } from '../../../icons/Icons';
import { StyledScopeCode } from './ScopeCode/ScopeCode.styles';

const getColors = (props: StyledTaskProps & { theme: Theme }) => {
  const colors = {
    border: props.theme.neutral200,
    background: 'white',
  };

  if (props.isCompleted) {
    colors.border = props.theme.neutral100;
    colors.background = props.theme.neutral025;
  }

  if (props.isSelected) {
    colors.border = props.theme.yellow500;
    // eslint-disable-next-line no-nested-ternary
    colors.background = props.isSchedule
      ? '#F2EBFE'
      : props.isPlan
      ? props.theme.neutral075
      : props.theme.yellow050;
  }

  if (props.isDragging) {
    colors.background = props.theme.blue050;
    colors.border = props.theme.blue050;
  }

  if (props.isTemp) {
    colors.background = props.theme.neutral050;
  }

  return colors;
};

const getBackgroundColor = (props: StyledTaskProps & { theme: Theme }) => {
  if (props.isPlan) {
    if (props.isSelected) {
      return props.theme.neutral075;
    }
    return props.theme.neutral050;
  }

  if (props.isSchedule) {
    if (props.isSelected) {
      return '#F2EBFE';
    }
    return '#F7F3FE';
  }

  if (props.isSelected) {
    return props.theme.yellow075;
  }
  return props.theme.neutral025;
};

const isActiveMixin = css`
  border-color: ${({ theme }) => theme.yellow700};
  box-shadow: 0 0 0 4px ${({ theme }) => theme.yellow200};
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;

  > * {
    margin-left: 8px;
  }
`;

interface StyledTaskProps {
  isPlan?: boolean;
  isSchedule?: boolean;
  isCompleted?: boolean;
  isActive?: boolean;
  isSelected?: boolean;
  isDragging?: boolean;
  isTemp?: boolean;
}

export const StyledTask = styled.div<StyledTaskProps>`
  display: flex;
  align-items: center;
  flex-direction: row;
  border: ${props =>
    props.isPlan || props.isSchedule ? 'none' : `1px solid ${getColors(props).border}`};
  border-bottom: ${({ isPlan, isSchedule, theme }) =>
    (isPlan || isSchedule) && `1px solid ${theme.neutral100}`};
  border-radius: ${({ isPlan, isSchedule }) => (isPlan || isSchedule ? 0 : '4px')};
  background-color: ${props => getColors(props).background};
  padding: 8px;
  font-size: 16px;
  margin: ${({ isPlan, isSchedule }) => (isPlan || isSchedule ? 0 : '4px 0')};
  color: ${({ isCompleted, theme }) => (isCompleted ? theme.neutral300 : theme.neutral700)};
  cursor: pointer;
  ${({ isActive }) => isActive && isActiveMixin};

  ${ActionsContainer} {
    display: ${({ isPlan, isSchedule, isSelected }) =>
      (isPlan || isSchedule) && !isSelected && 'none'};
  }

  &:hover {
    background-color: ${props => getBackgroundColor(props)};

    ${StyledScopeCode},
    ${ActionsContainer} {
      display: inherit;
    }
  }
`;

export const TaskTitle = styled.span<{ isTemp: boolean; isCompleted?: boolean }>`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 0;
  margin-right: 16px;
  text-align: left;
  color: ${({ theme, isTemp, isCompleted }) =>
    isTemp || isCompleted ? theme.neutral300 : theme.neutral700};
`;

export const StyledIconRightThickArrow = styled(IconRightThickArrow)`
  flex-shrink: 0;
`;
