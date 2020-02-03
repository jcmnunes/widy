import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Icon20 } from '@binarycapsule/ui-capsules';

const StyledDay = styled.div`
  height: 42px;
  border-radius: 4px;
  border: ${props =>
    props.selected ? `1px solid ${props.theme.blue700}` : `1px solid ${props.theme.neutral100}`};
  background: ${props => (props.selected ? props.theme.blue050 : 'white')};
  font-size: 14px;
  color: ${props => props.theme.neutral700};
  padding: ${props => (props.isSmall ? '0 8px' : '0 8px 0 16px')};
  display: flex;
  align-items: center;
  justify-content: ${props => (props.isSmall ? 'center' : 'space-between')};
  cursor: pointer;

  &:hover {
    border: 1px solid ${props => props.theme.blue700};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px ${props => props.theme.blue100};
  }
`;

class Day extends Component {
  hanldeOnKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.onClick();
    }
  };

  render() {
    const { onClick, selected, isSmall, children } = this.props;
    return (
      <StyledDay
        tabIndex="0"
        selected={selected}
        onClick={onClick}
        onKeyPress={this.hanldeOnKeyPress}
        isSmall={isSmall}
      >
        <span>{children}</span>
        {!isSmall && <Icon20 icon="CHEV_RIGHT" />}
      </StyledDay>
    );
  }
}

Day.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  isSmall: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
};

export default Day;
