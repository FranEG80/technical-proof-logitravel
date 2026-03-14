import type { AddItemDraft } from "@/features/home/model";

export type AddItemModalProps = {
  isOpen: boolean;
  onConfirm: (data: Partial<AddItemDraft>) => void;
  onRequestClose: () => void;
  onCloseAnimationEnd: () => void;
};
