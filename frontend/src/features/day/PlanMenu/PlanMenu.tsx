import React from 'react';
import { Dropdown, DropdownItem, IconButton } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router';
import { useMoveAll } from '../api/useMoveAll';

const Trigger = <IconButton hasBackground icon="dots_h" onClick={() => {}} />;

interface Props {
  planId: string;
}

export const PlanMenu: React.FC<Props> = ({ planId }) => {
  const { dayId: selectedDayId, sectionId: selectedSectionId } = useParams();
  const [moveAll] = useMoveAll();
  const history = useHistory();

  return (
    <>
      <Dropdown trigger={Trigger} placement="right">
        <DropdownItem
          icon="schedule"
          handleAction={() => {
            moveAll({
              to: 'schedule',
              body: {
                dayId: selectedDayId,
              },
            });

            if (selectedSectionId === planId) {
              history.push(`/day/${selectedDayId}`);
            }
          }}
          text="Schedule all tasks"
        />
        <></>
      </Dropdown>
    </>
  );
};
