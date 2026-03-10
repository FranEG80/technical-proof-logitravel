import styled from "styled-components";

export const List = styled.div`
  flex-grow: 1;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: 11px;
  background: ${({ theme }) => theme.colors.grayLight};
  border: 1px solid ${({ theme }) => theme.colors.grayDark};
`;
