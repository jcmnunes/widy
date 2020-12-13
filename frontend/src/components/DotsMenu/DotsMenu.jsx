import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import { IconButton, Menu } from '@binarycapsule/ui-capsules';

export const Control = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.neutral['100']};
  }
`;

const DotsMenu = ({ children }) => {
  return (
    <Control>
      <Menu
        trigger={<IconButton icon="dots_h" variant="ghost" variantColor="neutral" size="small" />}
        placement="right"
      >
        {children}
      </Menu>
    </Control>
  );
};

DotsMenu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default DotsMenu;
