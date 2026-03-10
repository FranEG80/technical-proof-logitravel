import { scan, startWith } from 'rxjs/operators';
import type { Observable } from 'rxjs';

export type Item = {
  id: string;
  text: string;
};

export type StateSnapshot = {
  items: Item[];
  selectedIds: string[];
  inputValue: string;
  isModalOpen: boolean;
  modalValue: string;
};

export type State = StateSnapshot & {
  history: StateSnapshot[];
};

export type Action =
  | { type: 'SET_INPUT'; value: string }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_MODAL_INPUT'; value: string }
  | { type: 'ADD_ITEM'; text: string }
  | { type: 'SELECT_ITEM'; id: string; multi: boolean }
  | { type: 'DELETE_SELECTED' }
  | { type: 'DELETE_ITEM'; id: string }
  | { type: 'UNDO' };

export const createInitialState = (): State => ({
  items: [
    { id: crypto.randomUUID(), text: 'Item 1' },
    { id: crypto.randomUUID(), text: 'Item 2' },
    { id: crypto.randomUUID(), text: 'Item 3' },
    { id: crypto.randomUUID(), text: 'Item 4' },
  ],
  selectedIds: [],
  inputValue: '',
  isModalOpen: false,
  modalValue: '',
  history: [],
});

export function cloneSnapshot(state: State): StateSnapshot {
  return {
    items: [...state.items],
    selectedIds: [...state.selectedIds],
    inputValue: state.inputValue,
    isModalOpen: state.isModalOpen,
    modalValue: state.modalValue,
  };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        inputValue: action.value,
      };

    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
        modalValue: '',
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        modalValue: '',
      };

    case 'SET_MODAL_INPUT':
      return {
        ...state,
        modalValue: action.value,
      };

    case 'ADD_ITEM': {
      const text = action.text.trim();
      if (!text) return state;

      const newItem: Item = {
        id: crypto.randomUUID(),
        text,
      };

      return {
        ...state,
        history: [...state.history, cloneSnapshot(state)],
        items: [...state.items, newItem],
        selectedIds: [newItem.id],
        inputValue: '',
        modalValue: '',
        isModalOpen: false,
      };
    }

    case 'SELECT_ITEM': {
      if (action.multi) {
        const exists = state.selectedIds.includes(action.id);

        return {
          ...state,
          selectedIds: exists
            ? state.selectedIds.filter((id) => id !== action.id)
            : [...state.selectedIds, action.id],
        };
      }

      return {
        ...state,
        selectedIds: [action.id],
      };
    }

    case 'DELETE_SELECTED': {
      if (state.selectedIds.length === 0) return state;

      return {
        ...state,
        history: [...state.history, cloneSnapshot(state)],
        items: state.items.filter((item) => !state.selectedIds.includes(item.id)),
        selectedIds: [],
      };
    }

    case 'DELETE_ITEM': {
      const exists = state.items.some((item) => item.id === action.id);
      if (!exists) return state;

      return {
        ...state,
        history: [...state.history, cloneSnapshot(state)],
        items: state.items.filter((item) => item.id !== action.id),
        selectedIds: state.selectedIds.filter((id) => id !== action.id),
      };
    }

    case 'UNDO': {
      if (state.history.length === 0) return state;

      const previous = state.history[state.history.length - 1];

      return {
        ...previous,
        history: state.history.slice(0, -1),
      };
    }

    default:
      return state;
  }
}

export function createStateStream(
  actions$: Observable<Action>,
  initialState: State
): Observable<State> {
  return actions$.pipe(
    startWith<Action>({ type: 'SET_INPUT', value: initialState.inputValue }),
    scan((currentState: State, action: Action) => reducer(currentState, action), initialState)
  );
}
