import type { FormHTMLAttributes, ReactElement } from 'react';
import styles from './ModalForm.module.css';

export type ModalFormProps = FormHTMLAttributes<HTMLFormElement>;

export function ModalForm({ className, children, ...props }: ModalFormProps): ReactElement {
  const classes = [styles.modalForm, className].filter(Boolean).join(' ');

  return (
    <form className={classes} {...props}>
      {children}
    </form>
  );
}
