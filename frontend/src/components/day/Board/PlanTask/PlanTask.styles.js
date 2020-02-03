import styled from 'styled-components/macro';
import { IconRightThickArrow } from '../../../../icons/Icons';

const getTaskBackground = props => {
  if (props.isDragging) return props.theme.blue050;
  if (props.isSelected) return props.theme.neutral075;
  return 'white';
};

export const Actions = styled.div`
  height: 24px;

  & > * {
    color: ${props => props.theme.neutral400};
    cursor: pointer;
    margin-left: 8px;
  }
`;

export const StyledIconRightThickArrow = styled(IconRightThickArrow)`
  flex-shrink: 0;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 16px;
  flex: 1;
  width: 0;
`;

export const StyledPlanTask = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  border: none;
  background: ${props => getTaskBackground(props)};
  padding: 8px;
  font-size: 16px;
  margin: 0;
  color: ${props => props.theme.neutral700};
  cursor: pointer;

  ${Actions} {
    display: ${props => (props.isSelected ? 'flex' : 'none')};
  }

  &:hover {
    background: ${props => (props.isSelected ? props.neutral075 : props.theme.neutral050)};

    & ${Actions} {
      display: flex;
    }
  }
`;

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
