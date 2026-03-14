import { LIST_ACTION, type AddItemDraft, type HomeDispatch } from '../model';

type UseItemsActionsParams = {
  dispatch: HomeDispatch;
};

export function useItemsActions({ dispatch }: UseItemsActionsParams) {
  const addItem = (payload: Partial<AddItemDraft>) => {
    dispatch({ type: LIST_ACTION.ADD_ITEM, payload  });
  }

  const selectItem = (id: string) => {
    dispatch({ type: LIST_ACTION.SELECT_ITEM, payload: id });
  }

  const deleteSelected = () => {
    dispatch({ type: LIST_ACTION.DELETE_SELECTED });
  }

  const undo = () => {
    dispatch({ type: LIST_ACTION.UNDO });
  }

  return {
    addItem,
    selectItem,
    deleteSelected,
    undo,
  };
}
