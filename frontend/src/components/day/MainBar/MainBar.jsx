import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const getColors = (status, theme) => {
  switch (status) {
    case 'working':
      return theme.yellow400;
    case 'inBreak':
      return theme.blue200;
    default:
      return theme.neutral400;
  }
};

const StyledMainBar = styled.div`
  background: ${props => getColors(props.status, props.theme)};
`;

const MainBar = ({ activeTask }) => {
  const getStatus = () => {
    if (activeTask.inBreak) return 'inBreak';
    if (activeTask.taskId) return 'working';
    return 'idle';
  };

  return <StyledMainBar status={getStatus()} />;
};

MainBar.propTypes = {
  activeTask: PropTypes.shape({
    inBreak: PropTypes.bool.isRequired,
    taskId: PropTypes.string,
  }).isRequired,
};

export default MainBar;
