import styled, { css } from 'styled-components';

type ListItemProps = {
  selected?: boolean;
  $disabled?: boolean;
};

export const ListItem = styled.div<ListItemProps>`
  width: 100%;
  padding: 9px 15px;

  ${({ selected, theme }) =>
    selected &&
    css`
      background: ${theme.colors.blueDark};
      color: ${theme.colors.white};
    `}

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      color: ${theme.colors.textDisabled};
    `}
`;
