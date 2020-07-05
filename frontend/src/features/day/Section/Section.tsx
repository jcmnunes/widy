import React, { useState } from 'react';
import {
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Button, Tooltip } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Task } from '../Task/Task';
import { SectionEmpty } from './Section.empty';
import { SectionDto } from '../api/useDay';
import { AddTaskModal } from '../modals/AddTaskModal/AddTaskModal';
import { TimerButton } from '../Timer/TimerButton/TimerButton';
import {
  SectionHeader,
  SectionWithTasks,
  StyledSection,
  TasksContainer,
  SectionHeaderActions,
} from './Section.styles';
import { Heading2 } from '../../../components/Typography';
import { TaskMenu } from '../TaskMenu/TaskMenu';
import { Launcher } from '../Launcher/Launcher';
import { useActiveTask } from '../api/useActiveTask';
import { useUpdateTask } from '../api/useUpdateTask';
import { useMoveAll } from '../api/useMoveAll';
import { sidebarSliceActions } from '../SideBar/SidebarSlice';
import { dayStateActions } from '../dayState/dayStateSlice';
import { AddToPlan } from '../AddToPlan/AddToPlan';
import { PlanMenu } from '../PlanMenu/PlanMenu';
import { sectionTitleMap } from './Section.constants';

interface Props {
  dayId: string;
  data: SectionDto;
}

export const Section: React.FC<Props> = ({ dayId, data: section }) => {
  const { id, isPlan, title, tasks } = section;
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const { data: activeTask } = useActiveTask();

  const { taskId: selectedTaskId, sectionId: selectedSectionId } = useParams();
  const history = useHistory();

  const [updateTask] = useUpdateTask();
  const [moveAll] = useMoveAll();

  const dispatch = useDispatch();

  const onTaskClick = (sectionId: string, taskId: string) => {
    history.push(`/day/${dayId}/${sectionId}/${taskId}`);
    dispatch(sidebarSliceActions.openSidebar());
  };

  const hideSchedule = () => {
    if (selectedSectionId === 'schedule') {
      history.push(`/day/${dayId}`);
    }
    dispatch(dayStateActions.hideSchedule());
  };

  const isSchedule = id === 'schedule';
  const hasTasks = tasks.length > 0;

  const renderSection = (provided: DroppableProvided, _snapshot: DroppableStateSnapshot) => (
    <SectionWithTasks ref={provided.innerRef} {...provided.droppableProps}>
      {tasks.map((task, index) => {
        // Task was optimistically added (does not have a db id yet)
        const isTemp = task.id.substring(0, 4) === 'temp';

        return (
          <Draggable key={task.id} draggableId={task.id} index={index} isDragDisabled={isTemp}>
            {(provided1, snapshot) => (
              <TasksContainer
                ref={provided1.innerRef}
                {...provided1.draggableProps}
                {...provided1.dragHandleProps}
              >
                <Task
                  dayId={dayId}
                  sectionId={id}
                  task={task}
                  isPlan={isPlan}
                  isSchedule={isSchedule}
                  isTemp={isTemp}
                  isSelected={selectedTaskId === task.id}
                  isActive={activeTask?.taskId === task.id}
                  isCompleted={task.completed}
                  isDragging={snapshot.isDragging}
                  onClick={() => onTaskClick(id, task.id)}
                  onCompletedChange={() => {
                    const payload = {
                      completed: !task.completed,
                      ...(task.id === activeTask?.taskId
                        ? {
                            start: null,
                            time: task.time + moment.utc().diff(task.start, 'seconds'),
                          }
                        : {}),
                    };
                    updateTask({
                      taskId: task.id,
                      body: {
                        dayId,
                        sectionId: id,
                        payload,
                      },
                    });
                  }}
                >
                  {isPlan && <Launcher sectionId={id} task={task} taskIndex={index} />}
                  {isSchedule && <AddToPlan task={task} />}
                  {!isPlan && !isSchedule && <TimerButton task={task} sectionId={id} />}
                  <TaskMenu dayId={dayId} sectionId={id} task={task} isPlan={isPlan} />
                </Task>
              </TasksContainer>
            )}
          </Draggable>
        );
      })}
      {provided.placeholder}
    </SectionWithTasks>
  );

  const renderEmptySection = (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <SectionEmpty
        title={title}
        isPlan={isPlan}
        isSchedule={isSchedule}
        isDraggingOver={snapshot.isDraggingOver}
        onClick={() => setIsAddTaskModalOpen(true)}
      />
      {/* Hack to remove the no-placeholder warning in development */}
      <div style={{ display: 'none' }}>{provided.placeholder}</div>
    </div>
  );

  return (
    <>
      <StyledSection>
        <SectionHeader isPlan={isSchedule || isPlan} hasTasks={hasTasks}>
          <Heading2>{sectionTitleMap[title as keyof typeof sectionTitleMap]}</Heading2>

          {isSchedule && (
            <SectionHeaderActions>
              {hasTasks && (
                <Button
                  appearance="minimal"
                  iconBefore="plus_c"
                  onClick={() => {
                    moveAll({
                      to: 'plan',
                      body: {
                        dayId,
                      },
                    });
                    if (selectedSectionId === 'schedule') {
                      history.push(`/day/${dayId}`);
                    }
                  }}
                >
                  Add all to Plan
                </Button>
              )}
              <Tooltip tooltip="Hide Schedule" delayShow={1000}>
                <Button appearance="minimal" iconBefore="x" onClick={hideSchedule} />
              </Tooltip>
            </SectionHeaderActions>
          )}

          {isPlan && (
            <SectionHeaderActions>{hasTasks && <PlanMenu planId={id} />}</SectionHeaderActions>
          )}
        </SectionHeader>
        <Droppable droppableId={id}>{hasTasks ? renderSection : renderEmptySection}</Droppable>

        <Button
          appearance="minimal"
          iconBefore="plus"
          onClick={() => setIsAddTaskModalOpen(true)}
          style={{ marginTop: 8 }}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {isSchedule ? 'Add to Schedule' : isPlan ? 'Add to Plan' : 'Add task'}
        </Button>
      </StyledSection>

      {isAddTaskModalOpen && (
        <AddTaskModal
          dayId={dayId}
          sectionId={id}
          onRequestClose={() => setIsAddTaskModalOpen(false)}
        />
      )}
    </>
  );
};
