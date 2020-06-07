import React from 'react';
import { Checkbox, theme } from '@binarycapsule/ui-capsules';
import { ScopeCode } from './ScopeCode/ScopeCode';
import { TaskDto } from '../api/useDay';
import { ActionsContainer, StyledIconRightThickArrow, StyledTask, TaskTitle } from './Task.syles';

interface Props {
  dayId: string;
  sectionId: string;
  isPlan?: boolean;
  isTemp?: boolean;
  isSelected?: boolean;
  isActive?: boolean;
  isCompleted?: boolean;
  isInBreak?: boolean;
  isDragging?: boolean;
  onClick?(): void;
  onCompletedChange?(): void;
  task: Partial<TaskDto>;
}

export const Task: React.FC<Props> = ({
  isPlan,
  isTemp = false,
  isSelected,
  isActive,
  isCompleted,
  isDragging,
  task,
  onClick,
  onCompletedChange,
  children,
}) => {
  const { title, scope } = task;

  return (
    <StyledTask
      isPlan={isPlan}
      isSelected={isSelected}
      isActive={isActive}
      isCompleted={isCompleted}
      isDragging={isDragging}
      onClick={!isTemp ? onClick : () => {}}
    >
      {isPlan ? (
        <StyledIconRightThickArrow primaryColor={isTemp ? theme.neutral300 : theme.neutral700} />
      ) : (
        <Checkbox
          inputSize="large"
          checked={!!isCompleted}
          onChange={!isTemp ? onCompletedChange : () => {}}
        />
      )}
      <TaskTitle isTemp={isTemp} isCompleted={isCompleted}>
        {title}
      </TaskTitle>
      {scope && <ScopeCode scopeCode={scope.shortCode} />}
      {children && !isTemp && !isCompleted && (
        <ActionsContainer onClick={e => e.stopPropagation()}>{children}</ActionsContainer>
      )}
    </StyledTask>
  );
};
