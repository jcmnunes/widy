import React from 'react';
import { Checkbox, theme } from '@binarycapsule/ui-capsules';
import { ScopeCode } from './ScopeCode/ScopeCode';
import { TaskDto } from '../api/useDay';
import { ActionsContainer, StyledIconRightThickArrow, StyledTask, TaskTitle } from './Task.syles';

interface Props {
  dayId: string;
  sectionId: string;
  isPlan?: boolean;
  isSchedule?: boolean;
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
  isSchedule,
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
      isSchedule={isSchedule}
      isSelected={isSelected}
      isActive={isActive}
      isCompleted={isCompleted}
      isDragging={isDragging}
      onClick={!isTemp ? onClick : () => {}}
    >
      {isPlan || isSchedule ? (
        <StyledIconRightThickArrow
          size={24}
          withCircle={false}
          primaryColor={isTemp ? theme.colors.neutral['300'] : theme.colors.neutral['700']}
          secondaryColor={theme.colors.neutral['300']}
        />
      ) : (
        <Checkbox
          size="large"
          variantColor="neutral"
          checked={!!isCompleted}
          onChange={!isTemp ? onCompletedChange : () => {}}
        />
      )}
      <TaskTitle isTemp={isTemp} isCompleted={isCompleted}>
        {title!}
      </TaskTitle>
      {scope && <ScopeCode scopeCode={scope.shortCode} />}
      {children && !isTemp && !isCompleted && (
        <ActionsContainer onClick={e => e.stopPropagation()}>{children}</ActionsContainer>
      )}
    </StyledTask>
  );
};
