import type { HTMLAttributes, ReactElement } from 'react';
import styles from './List.module.css';

export type ListProps = HTMLAttributes<HTMLUListElement>;

export function List({ className, children, ...props }: ListProps): ReactElement {
  const classes = [styles.list, className].filter(Boolean).join(' ');

  return (
    <ul className={classes} {...props}>
      {children}
    </ul>
  );
}
