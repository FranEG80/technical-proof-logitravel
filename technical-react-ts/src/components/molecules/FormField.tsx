import styled from 'styled-components';

export const FormField = styled.label`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;
