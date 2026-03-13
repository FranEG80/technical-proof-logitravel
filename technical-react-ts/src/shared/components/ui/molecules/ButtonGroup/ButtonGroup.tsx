import type { HTMLAttributes, ReactElement } from 'react';
import styles from './ButtonGroup.module.css';

type ButtonGroupJustify = 'flex-start' | 'space-between' | 'flex-end';

export type ButtonGroupProps = HTMLAttributes<HTMLDivElement> & {
  $justify?: ButtonGroupJustify;
};

const justifyClassName: Record<ButtonGroupJustify, string> = {
  'flex-start': styles.justifyStart,
  'space-between': styles.justifyBetween,
  'flex-end': styles.justifyEnd,
};

export function ButtonGroup({
  $justify = 'flex-start',
  className,
  children,
  ...props
}: ButtonGroupProps): ReactElement {
  const classes = [styles.buttonGroup, justifyClassName[$justify], className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
