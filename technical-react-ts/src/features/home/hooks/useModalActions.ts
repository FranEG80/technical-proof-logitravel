import { useCallback } from 'react';
import type { Dispatch } from 'react';
import { MODAL_ACTION, type HomeAction } from '../model';

type UseModalActionsParams = {
  dispatch: Dispatch<HomeAction>;
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
