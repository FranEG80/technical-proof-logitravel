import styled from "styled-components";

export const Card = styled.section`
  width: min(900px, calc(100% - 32px));
  min-height: 577px;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: auto;
  }
`;
