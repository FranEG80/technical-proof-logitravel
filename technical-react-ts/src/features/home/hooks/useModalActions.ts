import { useCallback } from 'react';
import { MODAL_ACTION, type HomeDispatch } from '../model';

type UseModalActionsParams = {
  dispatch: HomeDispatch;
};

export function useModalActions({ dispatch }: UseModalActionsParams) {
  const openModal = useCallback(() => {
    dispatch({ type: MODAL_ACTION.MODAL_OPEN });
  }, [dispatch]);

  const closeModal = useCallback(() => {
    dispatch({ type: MODAL_ACTION.MODAL_REQUEST_CLOSE });
  }, [dispatch]);

  const handleModalAnimationEnd = useCallback(() => {
    dispatch({ type: MODAL_ACTION.MODAL_ANIMATION_END });
  }, [dispatch]);

  return {
    openModal,
    closeModal,
    handleModalAnimationEnd,
  };
}
