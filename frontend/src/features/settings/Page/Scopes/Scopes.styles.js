import styled from '@emotion/styled/macro';

export const ScopesPageWrapper = styled.div`
  margin-top: 32px;
`;

export const ActionsTop = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const ScopesSearch = styled.div`
  @media (min-width: 600px) {
    max-width: 222px;
  }
`;

export const ShowArchiveScopesToggle = styled.div`
  margin-top: 24px;
`;
