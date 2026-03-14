import type { HTMLAttributes, ReactElement } from 'react';
import styles from './Card.module.css';

export type CardProps = HTMLAttributes<HTMLElement>;

export function Card({ className, children, ...props }: CardProps): ReactElement {
  const classes = [styles.card, className].filter(Boolean).join(' ');

  return <section className={classes} {...props}>{children}</section>;
}
