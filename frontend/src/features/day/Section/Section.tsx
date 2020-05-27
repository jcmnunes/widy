import React, { useState } from 'react';
import {
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Button } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Task } from '../Task/Task';
import { SectionEmpty } from './Section.empty';
import { SectionDto } from '../api/useDay';
import { AddTaskModal } from '../modals/AddTaskModal/AddTaskModal';
import { TimerButton } from '../Timer/TimerButton/TimerButton';
import { SectionWithTasks, StyledSection, TasksContainer } from './Section.styles';
import { Heading2 } from '../../../components/common/Typography';
import { TaskMenu } from '../TaskMenu/TaskMenu';
import { Launcher } from '../Launcher/Launcher';
import { useActiveTask } from '../api/useActiveTask';
import { useUpdateTask } from '../api/useUpdateTask';
import { useToggleActiveTask } from '../api/useToggleActiveTask';
import { sidebarSliceActions } from '../SideBar/SidebarSlice';

interface Props {
  dayId: string;
  data: SectionDto;
}

export const Section: React.FC<Props> = ({ dayId, data: { id, isPlan, title, tasks } }) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const { data: activeTask } = useActiveTask();

  const { taskId: selectedTaskId } = useParams();
  const history = useHistory();

  const [updateTask] = useUpdateTask();
  const toggleActiveTask = useToggleActiveTask();

  const dispatch = useDispatch();

  const onTaskClick = (sectionId: string, taskId: string) => {
    history.push(`/day/${dayId}/${sectionId}/${taskId}`);
    dispatch(sidebarSliceActions.openSidebar());
  };

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
                  isTemp={isTemp}
                  isSelected={selectedTaskId === task.id}
                  isActive={activeTask?.taskId === task.id}
                  isCompleted={task.completed}
                  isDragging={snapshot.isDragging}
                  onClick={() => onTaskClick(id, task.id)}
                  onCompletedChange={() => {
                    if (task.id === activeTask?.taskId) {
                      toggleActiveTask({
                        dayId,
                        sectionId: id,
                        task,
                      });
                    }
                    updateTask({
                      taskId: task.id,
                      body: {
                        dayId,
                        sectionId: id,
                        payload: {
                          completed: !task.completed,
                        },
                      },
                    });
                  }}
                >
                  {isPlan ? (
                    <Launcher sectionId={id} task={task} taskIndex={index} />
                  ) : (
                    <TimerButton task={task} sectionId={id} />
                  )}
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
        <Heading2>{title}</Heading2>
        <Droppable droppableId={id}>
          {tasks.length > 0 ? renderSection : renderEmptySection}
        </Droppable>

        <Button
          appearance="minimal"
          iconBefore="plus"
          onClick={() => setIsAddTaskModalOpen(true)}
          style={{ marginTop: 8 }}
        >
          {isPlan ? 'Add to Plan' : 'Add task'}
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
