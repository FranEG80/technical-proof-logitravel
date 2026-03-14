import type { ModalAction, HomeAction, HomeState, ItemsAction } from '../home.types';
import { LIST_ACTION, MODAL_ACTION } from '../actions/home.actions';
import { initialModalState, ModalReducer } from './modal.reducer';
import { initialItemsState, itemsReducer } from './items.reducer';

export const initialHomeState: HomeState = {
  Modal: initialModalState,
  ...initialItemsState,
  history: [],
};

function isModalAction(action: HomeAction): action is ModalAction {
  return (
    action.type === MODAL_ACTION.MODAL_OPEN ||
    action.type === MODAL_ACTION.MODAL_REQUEST_CLOSE ||
    action.type === MODAL_ACTION.MODAL_ANIMATION_END
  );
}

function isItemsAction(action: HomeAction): action is ItemsAction {
  return (
    action.type === LIST_ACTION.ADD_ITEM  ||
    action.type === LIST_ACTION.SELECT_ITEM ||
    action.type === LIST_ACTION.DELETE_SELECTED ||
    action.type === LIST_ACTION.UNDO
  );
}

export default function homeReducer(
  state: HomeState,
  action: HomeAction,
): HomeState {

  const nextModal = isModalAction(action)
    ? ModalReducer(state.Modal, action)
    : state.Modal;

  const nextItems = isItemsAction(action)
    ? itemsReducer({ items: state.items, history: state.history }, action)
    : { items: state.items, history: state.history };

  return {
    ...state,
    Modal: nextModal,
    ...nextItems,
  };
}
