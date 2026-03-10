import styled from 'styled-components';

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: clamp(26px, 3vw, 40px);
  line-height: 1.2;
`;

export const BodyText = styled.p`
  margin: 0;
  text-align: center;
`;

export const LabelText = styled.span`
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
  margin-top: 4px;
  display: block;
`; 