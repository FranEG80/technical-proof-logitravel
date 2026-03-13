import type { HTMLAttributes } from "react";


export type ModalOverlayProps = HTMLAttributes<HTMLElement> & {
  $isOpen: boolean;
};
