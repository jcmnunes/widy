import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@binarycapsule/ui-capsules';
import { useHistory } from 'react-router-dom';
import { StyledActionsTop } from './ActionsTop.styles';
import UserDropdown from '../../common/UserDropdown/UserDropdown';

const ActionsTop = ({ selectedDayId }) => {
  const history = useHistory();

  return (
    <StyledActionsTop>
      <IconButton
        text="Report"
        icon="SURVEY"
        isRound
        hasBackground
        onClick={() => history.push(`/report/${selectedDayId}`)}
      />
      <UserDropdown />
    </StyledActionsTop>
  );
};

ActionsTop.propTypes = {
  selectedDayId: PropTypes.string.isRequired,
};

export default ActionsTop;
