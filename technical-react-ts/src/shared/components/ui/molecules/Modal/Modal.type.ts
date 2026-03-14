import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type ModalProps = Omit<
  ComponentPropsWithoutRef<'dialog'>,
  'children' | 'onCancel' | 'onMouseDown' | 'onKeyDown'
> & {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
  onCloseAnimationEnd?: () => void;
};
