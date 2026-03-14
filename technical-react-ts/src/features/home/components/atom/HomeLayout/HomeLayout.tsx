import type { HTMLAttributes, ReactElement } from 'react';
import styles from './HomeLayout.module.css';

export type HomeLayoutProps = HTMLAttributes<HTMLElement>;

export function HomeLayout({ className, children, ...props }: HomeLayoutProps): ReactElement {
  const classes = [styles.homeLayout, className].filter(Boolean).join(' ');

  return (
    <main className={classes} {...props}>
      {children}
      </main>
    );
}
