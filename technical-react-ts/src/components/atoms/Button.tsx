import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'outline';

type ButtonProps = {
  $variant?: ButtonVariant;
  $iconOnly?: boolean;
};

const primaryStyles = css`
  background: ${({ theme }) => theme.colors.blueDark};
  color: ${({ theme }) => theme.colors.white};
`;

const outlineStyles = css`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.blueDark};
`;

export const Button = styled.button<ButtonProps>`
  border: 1px solid ${({ theme }) => theme.colors.blueDark};
  border-radius: ${({ theme }) => theme.radius.pill};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.375;
  padding: 15px 30px;
  text-transform: uppercase;
  transition: filter 0.2s ease;

  ${({ $variant = 'outline' }) => ($variant === 'primary' ? primaryStyles : outlineStyles)}

  &:hover {
    filter: brightness(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.blueMedium};
    outline-offset: 2px;
  }
`;
