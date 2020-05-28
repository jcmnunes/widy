import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Dropdown, IconButton } from '@binarycapsule/ui-capsules';

export const Control = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.neutral100};
  }
`;

const DotsMenu = ({ children }) => {
  return (
    <Control>
      <Dropdown trigger={<IconButton icon="dots_h" />} placement="right">
        {children}
      </Dropdown>
    </Control>
  );
};

DotsMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default DotsMenu;
