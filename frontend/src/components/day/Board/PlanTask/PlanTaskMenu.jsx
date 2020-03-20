import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, IconButton } from '@binarycapsule/ui-capsules';
import ScheduleTaskDialog from '../../../dialogs/ScheduleTask/ScheduleTaskDialog';

const PlanTaskMenu = ({
  taskId,
  sectionId,
  handlePlanTaskRename,
  handleTrashClick,
  canScheduleTask,
}) => {
  const [showScheduleTaskDialog, setShowScheduleTaskDialog] = useState(false);

  return (
    <>
      <Dropdown trigger={<IconButton icon="DOTS_H" onClick={() => {}} />} placement="right">
        <DropdownItem text="Rename" icon="EDIT" handleAction={handlePlanTaskRename} />
        {canScheduleTask && (
          <DropdownItem
            text="Schedule"
            icon="SCHEDULE"
            handleAction={() => setShowScheduleTaskDialog(true)}
          />
        )}
        <DropdownItem text="Delete" icon="TRASH" handleAction={handleTrashClick} />
      </Dropdown>

      <ScheduleTaskDialog
        isOpen={showScheduleTaskDialog}
        taskId={taskId}
        sectionId={sectionId}
        onRequestClose={() => setShowScheduleTaskDialog(false)}
      />
    </>
  );
};

PlanTaskMenu.propTypes = {
  taskId: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  handlePlanTaskRename: PropTypes.func.isRequired,
  handleTrashClick: PropTypes.func.isRequired,
  canScheduleTask: PropTypes.bool.isRequired,
};

export default PlanTaskMenu;
