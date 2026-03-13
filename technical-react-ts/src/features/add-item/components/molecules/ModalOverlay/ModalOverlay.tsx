import type { ReactElement } from 'react';
import styles from './ModalOverlay.module.css';
import type { ModalOverlayProps } from './ModalOverlay.type';

export function ModalOverlay({
  $isOpen,
  className,
  children,
  ...props
}: ModalOverlayProps): ReactElement {
  const classes = [styles.modalOverlay, $isOpen ? styles.open : styles.closing, className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
}
