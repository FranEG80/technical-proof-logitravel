import type { LabelHTMLAttributes, ReactElement } from 'react';
import styles from './FormField.module.css';

export type FormFieldProps = LabelHTMLAttributes<HTMLLabelElement>;

export function FormField({ className, children, ...props }: FormFieldProps): ReactElement {
  const classes = [styles.formField, className].filter(Boolean).join(' ');

  return (
    <label className={classes} {...props}>
      {children}
    </label>
  );
}
