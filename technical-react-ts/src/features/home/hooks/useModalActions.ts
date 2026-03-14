import { MODAL_ACTION, type HomeDispatch } from '../model';

type UseModalActionsParams = {
  dispatch: HomeDispatch;
};

export function useModalActions({ dispatch }: UseModalActionsParams) {
  const openModal = () => {
    dispatch({ type: MODAL_ACTION.MODAL_OPEN });
  }

  const closeModal = () => {
    dispatch({ type: MODAL_ACTION.MODAL_REQUEST_CLOSE });
  }

  const handleModalAnimationEnd = () => {
    dispatch({ type: MODAL_ACTION.MODAL_ANIMATION_END });
  }

  return {
    openModal,
    closeModal,
    handleModalAnimationEnd,
  };
}
