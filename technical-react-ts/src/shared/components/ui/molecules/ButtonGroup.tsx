import styled from 'styled-components';

export const ButtonGroup = styled.div<{ $justify?: 'flex-start' | 'space-between' | 'flex-end' }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: ${({ $justify = 'flex-start' }) => $justify};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
