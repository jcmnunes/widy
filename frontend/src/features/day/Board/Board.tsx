import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { useDayQuery } from '../api/useDayQuery';
import { Section } from '../Section/Section';
import { BoardLoading } from './Board.loading';
import { StyledBoard } from './Board.styles';
import { BoardHeader } from './BoardHeader/BoardHeader';
import { BoardError } from './Board.error';
import { useActiveTaskQuery } from '../api/useActiveTaskQuery';
import { useMoveTaskMutation } from '../api/useMoveTaskMutation';
import { useDays } from '../../daysNav/hooks/useDays';
import NoDays from '../../../components/NoDays';
import { showScheduleSelector } from '../dayState/dayStateSelectors';
import { useScheduleQuery } from '../api/useScheduleQuery';

interface Props {
  dayId?: string;
}

export const Board: React.FC<Props> = ({ dayId }) => {
  const { data: days, isSuccess } = useDays();

  const { status: getDayStatus, data: day, error: dayError } = useDayQuery(dayId);

  const { status: getActiveTaskStatus } = useActiveTaskQuery();

  const { status: getScheduleStatus, data: schedule } = useScheduleQuery();

  const { mutate: moveTask } = useMoveTaskMutation();

  const showSchedule = useSelector(showScheduleSelector);

  const handleDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination || !dayId) return;

    const { index: toIndex, droppableId: toSectionId } = destination;
    const { index: fromIndex, droppableId: fromSectionId } = source;

    // Drag ends at the same location
    if (fromSectionId === toSectionId && fromIndex === toIndex) {
      return;
    }

    moveTask({
      taskId: draggableId,
      body: {
        dayId,
        toIndex,
        fromIndex,
        toSectionId,
        fromSectionId,
      },
    });
  };

  const hasData = getDayStatus === 'success' && getActiveTaskStatus === 'success';

  return (
    <StyledBoard>
      <BoardHeader status={getDayStatus} day={day} />

      {isSuccess && days && days.length === 0 ? (
        <NoDays />
      ) : (
        <>
          {(getDayStatus === 'loading' || getActiveTaskStatus === 'loading') && <BoardLoading />}

          {(getDayStatus === 'error' || getActiveTaskStatus === 'error') && (
            <BoardError error={dayError as AxiosError} />
          )}

          <DragDropContext onDragEnd={handleDragEnd}>
            {hasData && day && (
              <>
                {showSchedule && (
                  <Section
                    dayId={day.id}
                    data={{
                      tasks: getScheduleStatus === 'success' ? schedule!.tasks : [],
                      id: 'schedule',
                      isPlan: false,
                      title: 'Schedule',
                    }}
                  />
                )}

                {day.sections.map(data => (
                  <Section key={data.id} dayId={day.id} data={data} />
                ))}
              </>
            )}
          </DragDropContext>
        </>
      )}
    </StyledBoard>
  );
};
