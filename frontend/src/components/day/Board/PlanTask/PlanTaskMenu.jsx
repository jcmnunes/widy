import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, IconButton } from '@binarycapsule/ui-capsules';

const PlanTaskMenu = ({ handlePlanTaskRename, handleTrashClick }) => {
  return (
    <Dropdown trigger={<IconButton icon="DOTS_H" onClick={() => {}} />} placement="right">
      <DropdownItem text="Rename" icon="EDIT" handleAction={handlePlanTaskRename} />
      <DropdownItem text="Delete" icon="TRASH" handleAction={handleTrashClick} />
    </Dropdown>
  );
};

PlanTaskMenu.propTypes = {
  handlePlanTaskRename: PropTypes.func.isRequired,
  handleTrashClick: PropTypes.func.isRequired,
};

export default PlanTaskMenu;
