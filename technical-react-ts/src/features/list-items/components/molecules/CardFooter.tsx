import styled from 'styled-components';

export const CardFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
