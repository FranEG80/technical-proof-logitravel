import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';
import { BehaviorSubject, Subject } from 'rxjs';
import { createHomeStateStream, initialHomeState, type HomeAction, type HomeState, type UseHomeReturn } from '../model';
import { useModalActions } from './useModalActions';
import { useItemsActions } from './useItemsActions';


export function useHome(): UseHomeReturn {
  const actions$ = useMemo(() => new Subject<HomeAction>(), []);
  const state$ = useMemo(() => new BehaviorSubject<HomeState>(initialHomeState), []);

  useEffect(() => {
    const streamSub = createHomeStateStream(actions$, initialHomeState)
      .subscribe((nextState) => {
        state$.next(nextState);
      });

    return () => {
      streamSub.unsubscribe();
    };
  }, [actions$, state$]);

  const dispatch = useCallback((action: HomeAction) => {
    actions$.next(action);
  }, [actions$]);

  const subscribe = useCallback((listener: () => void) => {
    const sub = state$.subscribe(() => {
      listener();
    });

    return () => sub.unsubscribe();
  }, [state$]);

  const getSnapshot = useCallback(() => state$.getValue(), [state$]);
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

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
