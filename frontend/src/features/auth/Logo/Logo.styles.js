import styled from 'styled-components/macro';
import { IconWidy, IconWidyText } from '../../../icons/widy';

export const StyledLogo = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  align-items: center;
  grid-gap: 16px;
`;

export const StyledIconWidy = styled(IconWidy)`
  .calendar-color {
    fill: ${props => props.theme.neutral600};
  }

  .today-color {
    fill: ${props => props.theme.neutral600};
  }

  .yesterday-color {
    fill: ${props => props.theme.blue600};
  }
`;

export const StyledIconWidyText = styled(IconWidyText)`
  .text-color {
    fill: ${props => props.theme.blue600};
  }
`;
