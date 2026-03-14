import type { HTMLAttributes, ReactElement } from 'react';
import styles from './CardFooter.module.css';

export type CardFooterProps = HTMLAttributes<HTMLElement>;

export function CardFooter({ className, children, ...props }: CardFooterProps): ReactElement {
  const classes = [styles.cardFooter, className].filter(Boolean).join(' ');

  return <footer className={classes} {...props}>{children}</footer>;
}
