import { useCallback, useMemo, useReducer } from 'react';
import { initialHomeState, type UseHomeReturn } from '../model';
import { useModalActions } from './useModalActions';
import { useItemsActions } from './useItemsActions';
import homeReducer from '../model/reducers';


export function useHome(): UseHomeReturn {
  const [state, dispatch] = useReducer(homeReducer, initialHomeState);

  const ModalActions = useModalActions({ dispatch });
  const itemsActions = useItemsActions({ dispatch });

  const addItem = useCallback(() => {
    if (!state.draft.name.trim()) return;
    itemsActions.addItem();
    ModalActions.closeModal();
  }, [state.draft.name, itemsActions, ModalActions]);

  return {
    state,
    actions: useMemo(() => ({
      ...ModalActions,
      ...itemsActions,
      addItem,

    }), [ModalActions, itemsActions, addItem]),
  };
}
