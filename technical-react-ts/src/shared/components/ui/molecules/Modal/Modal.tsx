import {
  useEffect,
  useRef,
  type MouseEvent,
  type ReactElement,
  type SyntheticEvent,
} from 'react';
import styles from './Modal.module.css';
import type { ModalProps } from './Modal.type';

function openDialog(dialog: HTMLDialogElement) {
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
    return;
  }

  dialog.setAttribute('open', '');
}

function closeDialog(dialog: HTMLDialogElement) {
  if (typeof dialog.close === 'function') {
    dialog.close();
    return;
  }

  dialog.removeAttribute('open');
}

export function Modal({
  isOpen,
  onRequestClose,
  onCloseAnimationEnd,
  className,
  children,
  ...props
}: ModalProps): ReactElement {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const classes = [styles.modal, isOpen ? styles.open : styles.closing, className].filter(Boolean).join(' ');

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const handleAnimationEnd = () => {
      if (!isOpen) {
        onCloseAnimationEnd?.();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      event.preventDefault();
      onRequestClose();
    };

    dialog.addEventListener('animationend', handleAnimationEnd);
    dialog.addEventListener('keydown', handleKeyDown);

    if (!dialog.open) {
      openDialog(dialog);
    }

    return () => {
      dialog.removeEventListener('animationend', handleAnimationEnd);
      dialog.removeEventListener('keydown', handleKeyDown);

      if (dialog.open) {
        closeDialog(dialog);
      }
    };
  }, [isOpen, onCloseAnimationEnd, onRequestClose]);

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement, Event>) => {
    event.preventDefault();
    onRequestClose();
  };

  const handleMouseDown = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;

    onRequestClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={classes}
      onCancel={handleCancel}
      onMouseDown={handleMouseDown}
      {...props}
    >
      {children}
    </dialog>
  );
}
