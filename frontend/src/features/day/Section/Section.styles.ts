import styled from '@emotion/styled/macro';
import { Heading2 } from '../../../components/Typography';

export const StyledSection = styled.div`
  margin: 32px 0;
`;

export const SectionWithTasks = styled.div``;

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionHeader = styled.div<{ isPlan: boolean; hasTasks: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-bottom: ${({ theme, isPlan, hasTasks }) =>
    isPlan && hasTasks && `1px solid ${theme.colors.neutral['100']}`};

  ${Heading2} {
    margin-bottom: 0;
  }
`;

export const SectionHeaderActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * + * {
    margin-left: 4px;
  }
`;
