import type { ReactElement } from 'react';
import type { ListItemProps } from './ListItem.type';
import styles from './ListItem.module.css';

export function ListItem({
  selected,
  $disabled,
  className,
  children,
  ...props
}: ListItemProps): ReactElement {
  const classes = [
    styles.listItem,
    selected ? styles.selected : '',
    $disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <li className={classes} {...props}>
      {children}
    </li>
  );
}
