import styled from 'styled-components/macro';

const Heading1 = styled.h1`
  font-weight: bold;
  font-size: 16px;
  color: ${props => props.theme.neutral700};
  text-transform: uppercase;
`;

export default Heading1;
