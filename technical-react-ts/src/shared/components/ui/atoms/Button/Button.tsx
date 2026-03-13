import type { ReactElement } from 'react';
import styles from './Button.module.css';
import type { ButtonProps } from './Button.type';

export function Button({
  $variant = 'outline',
  $iconOnly,
  className,
  children,
  ...props
}: ButtonProps): ReactElement {
  const classes = [styles.button, styles[$variant], className].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
