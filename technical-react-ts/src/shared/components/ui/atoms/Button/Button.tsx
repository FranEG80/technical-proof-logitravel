import { memo, type ReactElement } from 'react';

import styles from './Button.module.css';
import type { ButtonProps } from './Button.type';

function ButtonComponent({
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

export const Button = memo(ButtonComponent, (prevProps, nextProps) => {
  return (
    prevProps.$variant === nextProps.$variant && 
    prevProps.$iconOnly === nextProps.$iconOnly &&
    prevProps.className === nextProps.className &&
    prevProps.disabled === nextProps.disabled
  );
});
