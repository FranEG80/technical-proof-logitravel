import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 19px 21px;
  border: 1px solid ${({ theme }) => theme.colors.grayDark};
  background: ${({ theme }) => theme.colors.grayLight};
  font: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.black};
    opacity: 0.6;
  }
`;
