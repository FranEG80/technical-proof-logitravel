import styled from "styled-components";

export const HomeLayout = styled.main`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 24px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.blueMedium} 0%, ${({ theme }) => theme.colors.blueLight} 100%);


  @media (max-width: 768px) {
    padding: 5px;
  }
`;

