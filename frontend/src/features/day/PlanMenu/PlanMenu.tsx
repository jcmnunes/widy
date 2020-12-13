import React from 'react';
import { Icon, IconButton, Menu, MenuItem } from '@binarycapsule/ui-capsules';
import { useHistory, useParams } from 'react-router';
import { useMoveAll } from '../api/useMoveAll';
import { DayRouteParams } from '../dayTypes';

const Trigger = (
  <IconButton icon="dots_h" variant="ghost" variantColor="neutral" onClick={() => {}} />
);

interface Props {
  planId: string;
}

export const PlanMenu: React.FC<Props> = ({ planId }) => {
  const { dayId: selectedDayId, sectionId: selectedSectionId } = useParams<DayRouteParams>();
  const [moveAll] = useMoveAll();
  const history = useHistory();

  return (
    <>
      <Menu trigger={Trigger} placement="right">
        <MenuItem
          leftAddon={<Icon icon="calendar" size="18px" />}
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
