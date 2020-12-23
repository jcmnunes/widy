import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';
import { Theme } from '@binarycapsule/ui-capsules/dist/types';
import { TruncatedText } from '@binarycapsule/ui-capsules';
import { IconRightThickArrow } from '../../../icons/Icons';
import { StyledScopeCode } from './ScopeCode/ScopeCode.styles';

const getColors = (props: StyledTaskProps & { theme: Theme }) => {
  const colors = {
    border: props.theme.colors.neutral['200'],
    background: 'white',
  };

  if (props.isCompleted) {
    colors.border = props.theme.colors.neutral['100'];
    colors.background = props.theme.colors.neutral['50'];
  }

  if (props.isSelected) {
    colors.border = props.theme.colors.yellow['500'];
    // eslint-disable-next-line no-nested-ternary
    colors.background = props.isSchedule
      ? '#F2EBFE'
      : props.isPlan
      ? props.theme.colors.neutral['100']
      : props.theme.colors.yellow['50'];
  }

  if (props.isDragging) {
    colors.background = props.theme.colors.blue['50'];
    colors.border = props.theme.colors.blue['50'];
  }

  if (props.isTemp) {
    colors.background = props.theme.colors.neutral['50'];
  }

  return colors;
};

const getBackgroundColor = (props: StyledTaskProps & { theme: Theme }) => {
  if (props.isPlan) {
    if (props.isSelected) {
      return props.theme.colors.neutral['100'];
    }
    return props.theme.colors.neutral['50'];
  }

  if (props.isSchedule) {
    if (props.isSelected) {
      return '#F2EBFE';
    }
    return '#F7F3FE';
  }

  if (props.isSelected) {
    return props.theme.colors.yellow['100'];
  }
  return props.theme.colors.neutral['50'];
};

const isActiveMixin = (props: { theme: Theme }) => css`
  border-color: ${props.theme.colors.yellow['700']};
  box-shadow: 0 0 0 4px ${props.theme.colors.yellow['200']};
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
    (isPlan || isSchedule) && `1px solid ${theme.colors.neutral['100']}`};
  border-radius: ${({ isPlan, isSchedule }) => (isPlan || isSchedule ? 0 : '4px')};
  background-color: ${props => getColors(props).background};
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
  margin: ${({ isPlan, isSchedule }) => (isPlan || isSchedule ? 0 : '4px 0')};
  color: ${({ isCompleted, theme }) =>
    isCompleted ? theme.colors.neutral['300'] : theme.colors.neutral['700']};
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

export const TaskTitle = styled(TruncatedText)<{ isTemp: boolean; isCompleted?: boolean }>`
  flex: 1;
  width: 0;
  margin-right: 16px;
  text-align: left;
  font-weight: 500;
  color: ${({ theme, isTemp, isCompleted }) =>
    isTemp || isCompleted ? theme.colors.neutral['300'] : theme.colors.neutral['700']};
`;

export const StyledIconRightThickArrow = styled(IconRightThickArrow)<{ primaryColor: string }>`
  flex-shrink: 0;
`;
