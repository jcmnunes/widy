import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import moment from 'moment';
import Section from '../Section/Section.container';
import ActionsTop from '../../ActionsTop/ActionsTop.container';
import LoadingBoard from './LoadingBoard';
import NoDays from '../../NoDays';
import { Header, LargeText, StyledBoard, Title } from './Boards.styles';

const Board = ({
  sectionsOrder,
  day,
  sectionsLoading,
  sectionsById,
  dayId,
  daysOrder,
  daysLoading,
  activeTaskId,
  onDragEnd,
}) => {
  const handleDragEnd = result => onDragEnd(result, sectionsById, activeTaskId);

  return sectionsLoading || daysLoading ? (
    <LoadingBoard />
  ) : (
    <StyledBoard>
      <Header>
        <Title>
          {dayId ? (
            <>
              <LargeText>{`${moment(day).format('ddd DD')}`} </LargeText>
              <span>{`${moment(day).format('MMM YYYY')}`}</span>{' '}
            </>
          ) : (
            ''
          )}
        </Title>
        <ActionsTop noDays={daysOrder.length === 0} />
      </Header>
      {daysOrder.length === 0 ? (
        <NoDays />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          {dayId &&
            sectionsOrder.map(sectionId => (
              <Section key={sectionId} dayId={dayId} sectionId={sectionId} />
            ))}
        </DragDropContext>
      )}
    </StyledBoard>
  );
};

Board.propTypes = {
  sectionsOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  day: PropTypes.string.isRequired,
  sectionsLoading: PropTypes.bool.isRequired,
  sectionsById: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({}),
  }).isRequired,
  dayId: PropTypes.string.isRequired,
  activeTaskId: PropTypes.string.isRequired,
  daysOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  daysLoading: PropTypes.bool.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default Board;
