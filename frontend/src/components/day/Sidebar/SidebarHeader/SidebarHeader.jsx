import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components/macro';
import { EditableInput } from '@binarycapsule/ui-capsules';

const StyledSidebarHeader = styled.div`
  color: ${props => props.theme.neutral700};
  margin-bottom: 16px;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SidebarHeader = ({ selectedTask, selectedDay, updateTask }) => {
  const updateTaskTitle = title => {
    const payload = { title };
    updateTask(selectedTask.id, payload);
  };

  return (
    <StyledSidebarHeader>
      <TopBar>
        <div>{selectedDay ? moment(selectedDay.day).format('ddd DD MMM YYYY') : ''}</div>
      </TopBar>
      <div style={{ marginLeft: -14 }}>
        <EditableInput
          key={selectedTask.id} // Use a key to prevent WDY-250
          size="large"
          value={selectedTask ? selectedTask.title : ''}
          action={updateTaskTitle}
        />
      </div>
    </StyledSidebarHeader>
  );
};

SidebarHeader.defaultProps = {
  selectedDay: '',
};

SidebarHeader.propTypes = {
  selectedTask: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  selectedDay: PropTypes.shape({
    day: PropTypes.string.isRequired,
  }),
  updateTask: PropTypes.func.isRequired,
};

export default SidebarHeader;
