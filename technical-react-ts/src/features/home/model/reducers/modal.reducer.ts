import type { ModalAction, ModalState } from '../home.types';
import { MODAL_ACTION } from '../actions/home.actions';

export const initialModalState: ModalState = {
  isOpen: false,
  isClosing: false,
};

export function ModalReducer( state: ModalState, action: ModalAction ): ModalState {
  switch (action.type) {
    case MODAL_ACTION.MODAL_OPEN:
      return { isOpen: true, isClosing: false };

    case MODAL_ACTION.MODAL_REQUEST_CLOSE: {
      if (!state.isOpen) return state;
      return { isOpen: false, isClosing: true };
    }

    case MODAL_ACTION.MODAL_ANIMATION_END:
      if (!state.isClosing) return state;
      return { isOpen: false, isClosing: false };

    default:
      return state;
  }
}
