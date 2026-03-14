import type { Item } from '@/shared/model/items.types';

export type ListSectionProps = {
  onAddClick: () => void;
  items: Array<Item>;
  isModalVisible: boolean;
  onSelectItem: (id: string) => void;
  onDelete: () => void;
  onUndo: () => void;
  isHistoryEmpty: boolean;
};
