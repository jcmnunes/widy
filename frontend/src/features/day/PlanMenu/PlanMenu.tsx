import React from 'react';
import { IconButton, Menu, MenuItem } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router';
import { useMoveAllMutation } from '../api/useMoveAllMutation';
import { DayRouteParams } from '../dayTypes';

const Trigger = (
  <IconButton icon="dots_h" variant="ghost" variantColor="neutral" onClick={() => {}} />
);

interface Props {
  planId: string;
}

export const PlanMenu: React.FC<Props> = ({ planId }) => {
  const { dayId: selectedDayId, sectionId: selectedSectionId } = useParams<DayRouteParams>();
  const { mutate: moveAll } = useMoveAllMutation();
  const history = useHistory();

  return (
    <>
      <Menu trigger={Trigger} placement="bottom-end">
        <MenuItem
          leftIcon="calendar"
          onClick={() => {
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
      </Menu>
    </>
  );
};
