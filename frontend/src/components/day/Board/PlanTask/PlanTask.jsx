import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { IconButton, Tooltip, theme } from '@binarycapsule/ui-capsules';
import DeleteTaskDialog from '../../../dialogs/DeleteTask/DeleteTask.container';
import {
  Actions,
  Control,
  StyledIconRightThickArrow,
  StyledPlanTask,
  Title,
  TitleContainer,
} from './PlanTask.styles';
import PlanTaskMenu from './PlanTaskMenu';
import ScopeCode from '../../../common/ScopeCode/ScopeCode';

class PlanTask extends Component {
  state = { showDeleteTaskDialog: false };

  handleTrashClick = () => {
    this.setState({ showDeleteTaskDialog: true });
  };

  deleteTaskCancelAction = () => {
    this.setState({ showDeleteTaskDialog: false });
  };

  render() {
    const {
      index,
      taskId,
      taskTitle,
      sectionId,
      scopeCode,
      selectedTaskId,
      handlePlanTaskClick,
      handlePlanTaskRename,
      handlePlanTaskLaunch,
      canScheduleTask,
    } = this.props;
    const { showDeleteTaskDialog } = this.state;
    return (
      <>
        <Draggable draggableId={taskId} index={index}>
          {(provided, snapshot) => (
            <StyledPlanTask
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isSelected={taskId === selectedTaskId}
              onClick={handlePlanTaskClick}
              isDragging={snapshot.isDragging}
            >
              <TitleContainer onDoubleClick={handlePlanTaskRename}>
                <StyledIconRightThickArrow />
                <Title>{taskTitle}</Title>
              </TitleContainer>
              <Actions>
                <ScopeCode scopeCode={scopeCode} />
                {/*
                <TaskCopyButton taskTitle={taskTitle} />
                */}
                <Tooltip tooltip="Start working on this task" delayShow={1000}>
                  <IconButton
                    icon="LAUNCH"
                    onClick={handlePlanTaskLaunch}
                    colors={[theme.neutral200, theme.neutral400, theme.blue100, theme.blue500]}
                  />
                </Tooltip>
                <Control>
                  <PlanTaskMenu
                    taskId={taskId}
                    sectionId={sectionId}
                    handleTrashClick={this.handleTrashClick}
                    handlePlanTaskRename={handlePlanTaskRename}
                    canScheduleTask={canScheduleTask}
                  />
                </Control>
              </Actions>
            </StyledPlanTask>
          )}
        </Draggable>
        <DeleteTaskDialog
          show={showDeleteTaskDialog}
          taskId={taskId}
          sectionId={sectionId}
          handleClose={this.deleteTaskCancelAction}
        />
      </>
    );
  }
}

PlanTask.defaultProps = {
  scopeCode: null,
};

PlanTask.propTypes = {
  index: PropTypes.number.isRequired,
  taskId: PropTypes.string.isRequired,
  taskTitle: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  scopeCode: PropTypes.string,
  selectedTaskId: PropTypes.string.isRequired,
  handlePlanTaskClick: PropTypes.func.isRequired,
  handlePlanTaskRename: PropTypes.func.isRequired,
  handlePlanTaskLaunch: PropTypes.func.isRequired,
  canScheduleTask: PropTypes.bool.isRequired,
};

export default PlanTask;
