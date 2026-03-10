export type AddItemModalProps = {
  isOpen: boolean;
  draft: { name: string };
  onDraftChange: (draft: { name: string }) => void;
  onConfirm: () => void;
  onRequestClose: () => void;
  onCloseAnimationEnd: () => void;
};
