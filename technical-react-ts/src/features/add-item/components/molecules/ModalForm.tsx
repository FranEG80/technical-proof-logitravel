import styled from 'styled-components';

export const ModalForm = styled.form`
  width: min(700px, calc(100% - 32px));
  min-height: 276px;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;
