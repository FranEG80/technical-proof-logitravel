import type { HTMLAttributes, ReactElement } from 'react';
import styles from './CardHeader.module.css';

export type CardHeaderProps = HTMLAttributes<HTMLElement>;

export function CardHeader({ className, children, ...props }: CardHeaderProps): ReactElement {
  const classes = [styles.cardHeader, className].filter(Boolean).join(' ');

  return (
    <header className={classes} {...props}>
      {children}
    </header>
  );
}
