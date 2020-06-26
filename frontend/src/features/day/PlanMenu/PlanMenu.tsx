import React from 'react';
import { Dropdown, DropdownItem, IconButton } from '@binarycapsule/ui-capsules';

const Trigger = <IconButton hasBackground icon="dots_h" onClick={() => {}} />;

interface Props {}

export const PlanMenu: React.FC<Props> = () => {
  return (
    <>
      <Dropdown trigger={Trigger} placement="right">
        <DropdownItem icon="schedule" handleAction={() => {}} text="Schedule all tasks" />
        <></>
      </Dropdown>
    </>
  );
};
