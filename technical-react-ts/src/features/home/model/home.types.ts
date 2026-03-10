import type { Item } from '@/shared/model/items.types';
import type { LIST_ACTION, MODAL_ACTION } from './actions/home.actions';


export type ModalState = {
  isOpen: boolean;
  isClosing: boolean;
};

export const historyActionTypes = {
  DELETE: 'DELETE',
  ADD: 'ADD',
} as const;

export type HystoryEntry = {
  action: typeof historyActionTypes[keyof typeof historyActionTypes];
  items: Array<Item>;
};

export type HomeState = {
  Modal: ModalState;
  draft: AddItemDraft;
  items: Array<Item>;
  history: Array<HystoryEntry>;
};

export type ModalAction =
  | { type: typeof MODAL_ACTION.MODAL_OPEN }
  | { type: typeof MODAL_ACTION.MODAL_REQUEST_CLOSE }
  | { type: typeof MODAL_ACTION.MODAL_ANIMATION_END }
;

export type HomeAction =
  | ModalAction
  | ItemsAction
;

export type HomeDispatch = (action: HomeAction) => void;

export type HomeActions = {
  openModal: () => void;
  closeModal: () => void;
  handleModalAnimationEnd: () => void;
  handleDraft: (payload: Partial<AddItemDraft>) => void;
  addItem: () => void;
  selectItem: (id: string) => void;
  deleteSelected: () => void;
  undo: () => void;
};

export type UseHomeReturn = {
  state: HomeState;
  actions: HomeActions;
};

export type AddItemDraft = Pick<Item, 'name'>;

export type ItemsAction =
  | { type: typeof LIST_ACTION.ADD_ITEM_DRAFT_CHANGED; payload: Partial<AddItemDraft> }
  | { type: typeof LIST_ACTION.ADD_ITEM }
  | { type: typeof LIST_ACTION.SELECT_ITEM; payload: string }
  | { type: typeof LIST_ACTION.DELETE_SELECTED }
  | { type: typeof LIST_ACTION.UNDO }
;


export type ItemsState = Pick<HomeState, 'draft' | 'items' | 'history'>;
