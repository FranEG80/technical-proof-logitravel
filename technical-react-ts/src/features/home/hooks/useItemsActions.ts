import { useCallback } from 'react';
import { LIST_ACTION, type AddItemDraft, type HomeDispatch } from '../model';

type UseItemsActionsParams = {
  dispatch: HomeDispatch;
};

export function useItemsActions({ dispatch }: UseItemsActionsParams) {
  const handleDraft = useCallback((payload: Partial<AddItemDraft>) => {
    dispatch({ type: LIST_ACTION.ADD_ITEM_DRAFT_CHANGED, payload });
  }, [dispatch]);

  const addItem = useCallback(() => {
    dispatch({ type: LIST_ACTION.ADD_ITEM });
  }, [dispatch]);

  const selectItem = useCallback((id: string) => {
    dispatch({ type: LIST_ACTION.SELECT_ITEM, payload: id });
  }, [dispatch]);

  const deleteSelected = useCallback(() => {
    dispatch({ type: LIST_ACTION.DELETE_SELECTED });
  }, [dispatch]);

  const undo = useCallback(() => {
    dispatch({ type: LIST_ACTION.UNDO });
  }, [dispatch]);

  return {
    handleDraft,
    addItem,
    selectItem,
    deleteSelected,
    undo,
  };
}
