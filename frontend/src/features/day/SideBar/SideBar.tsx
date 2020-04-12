import React from 'react';
import { useParams } from 'react-router';
import moment from 'moment';
import { Timer } from '../Timer/Timer';
import useDay, { useSection, useTask } from '../api/useDay';
import { IllustrationTodoList } from '../../../icons/Illustrations';
import { EditableTaskTitle } from '../EditableTaskTitle/EditableTaskTitle';
import { Heading2 } from '../../../components/common/Typography';
import {
  SideBarEmptyState,
  SideBarEmptyStateText,
  SidebarSection,
  StyledSidebar,
} from './SideBar.styles';
import { ScopeSelect } from '../ScopeSelect/ScopeSelect';
import { useScopesOptions } from '../api/useScopes';
import { useUpdateTask } from '../api/useUpdateTask';

interface Props {}

export const SideBar: React.FC<Props> = () => {
  const { dayId, sectionId, taskId } = useParams();
  const { data: day } = useDay(dayId);
  const section = useSection(dayId, sectionId);
  const task = useTask(dayId, sectionId, taskId);
  const scopesOptions = useScopesOptions();
  const [updateTask] = useUpdateTask();

  if (!section || !task) {
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
    <StyledSidebar>
      <SidebarSection>
        <div>{day ? moment(day.day).format('ddd DD MMM YYYY') : ''}</div>
      </SidebarSection>
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
        <Heading2>Scope</Heading2>
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
        <Heading2>Timer</Heading2>
        <Timer section={section} task={task} />
      </SidebarSection>
      <SidebarSection>
        <Heading2>Notes</Heading2>
        {/* TODO ➜ NotesEditor */}
      </SidebarSection>
    </StyledSidebar>
  );
};
