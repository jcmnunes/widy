import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Text } from '@binarycapsule/ui-capsules';
import { Timer } from '../Timer/Timer';
import { useSection, useTask } from '../api/useDayQuery';
import { EditableTaskTitle } from '../EditableTaskTitle/EditableTaskTitle';
import {
  SidebarCloseButton,
  SideBarEmptyState,
  SideBarEmptyStateText,
  SidebarSection,
  StyledSidebar,
} from './SideBar.styles';
import { ScopeSelect } from '../ScopeSelect/ScopeSelect';
import { useScopesOptions } from '../api/useScopesQuery';
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation';
import { sidebarSliceActions } from './SidebarSlice';
import { isSidebarOpenSelector } from './SideBar.selectors';
import { NotesEditor } from '../NotesEditor/NotesEditor';
import { IllustrationTodoList } from '../../../illustrations/IllustrationTodoList';
import { useScheduleQuery } from '../api/useScheduleQuery';
import { AddToPlan } from '../AddToPlan/AddToPlan';
import { DayRouteParams } from '../dayTypes';

interface Props {}

export const SideBar: React.FC<Props> = () => {
  const { dayId, sectionId, taskId } = useParams<DayRouteParams>();

  const { data: schedule } = useScheduleQuery();

  const section = useSection(dayId, sectionId);

  const dayTask = useTask(dayId, sectionId, taskId);

  const scopesOptions = useScopesOptions();

  const { mutate: updateTask } = useUpdateTaskMutation();

  const isSidebarOpen = useSelector(isSidebarOpenSelector);

  const dispatch = useDispatch();

  const scheduleTask =
    schedule && schedule.tasks ? schedule.tasks.find(({ id }) => taskId === id) : undefined;

  const isSchedule = sectionId === 'schedule';

  const task = isSchedule ? scheduleTask : dayTask;

  if (!task) {
    return (
      <StyledSidebar>
        <SideBarEmptyState>
          <IllustrationTodoList />
          <SideBarEmptyStateText>Select a task to see more info here</SideBarEmptyStateText>
        </SideBarEmptyState>
      </StyledSidebar>
    );
  }

  return (
    <StyledSidebar isOpen={isSidebarOpen}>
      <SidebarSection>
        <EditableTaskTitle
          key={taskId} // Use a key to prevent WDY-250
          dayId={dayId!}
          taskId={taskId!}
          sectionId={sectionId!}
          taskTitle={task.title}
        />
      </SidebarSection>
      <SidebarSection>
        <Text variant="label" mb="8">
          Scope
        </Text>
        <ScopeSelect
          value={scopesOptions.find(scopeOpt => scopeOpt.value === task?.scope?.id) || null}
          options={scopesOptions}
          onChange={opt => {
            if (!taskId || !sectionId || !dayId) return;

            updateTask({
              taskId,
              body: {
                dayId,
                sectionId,
                payload: {
                  scope: opt ? opt.value : null,
                },
              },
            });
          }}
        />
      </SidebarSection>

      <SidebarSection>
        <Text variant="label" mb="8">
          Timer
        </Text>
        {isSchedule ? (
          <AddToPlan task={task} isButton />
        ) : (
          !!section && <Timer section={section} task={task} />
        )}
      </SidebarSection>

      <SidebarSection>
        <Text variant="label" mb="8">
          Notes
        </Text>

        <NotesEditor notes={task.notes} mb="32" />
      </SidebarSection>

      <SidebarCloseButton>
        <IconButton
          variant="ghost"
          variantColor="neutral"
          icon="x"
          onClick={() => dispatch(sidebarSliceActions.closeSidebar())}
          size="small"
        />
      </SidebarCloseButton>
    </StyledSidebar>
  );
};
