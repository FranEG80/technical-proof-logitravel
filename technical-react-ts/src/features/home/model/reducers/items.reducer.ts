import { LIST_ACTION } from '../actions/home.actions';
import { historyActionTypes, type ItemsAction, type ItemsState } from '../home.types';

export const initialItemsState: ItemsState = {
  draft: {
    name: '',
  },
  items: [
    { id: crypto.randomUUID(), name: 'Item 1' },
    { id: crypto.randomUUID(), name: 'Item 2' },
    { id: crypto.randomUUID(), name: 'Item 3' },
  ],
  history: [],
};

export function itemsReducer( state: ItemsState, action: ItemsAction): ItemsState {
  switch (action.type) {
    case LIST_ACTION.ADD_ITEM_DRAFT_CHANGED:
      return {
        ...state,
        draft: { ...state.draft, ...action.payload },
      };

    case LIST_ACTION.ADD_ITEM:
      const itemName = state.draft.name.trim();
      if (!itemName) return state;

      const uuid = crypto.randomUUID();

      return {
        ...state,
        items: [
          ...state.items,
          { id: uuid, name: itemName, selected: false },
        ],
        draft: { name: '' },
        history: [
          ...state.history,
          {
            action: historyActionTypes.ADD,
            items: [{ id: uuid, name: itemName, selected: false }]
          }
        ],
      };

    case LIST_ACTION.SELECT_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, selected: !item.selected } : item
        ),
      };

    case LIST_ACTION.DELETE_SELECTED:
      if (state.items.every(item => !item.selected)) return state;
      
      return {
        ...state,
        items: state.items.filter(item => !item.selected),
        history: [
          ...state.history,
          {
            action: historyActionTypes.DELETE,
            items: state.items.filter(item => item.selected)
          }
        ],
      };

    case LIST_ACTION.UNDO:

      const last = state.history[state.history.length - 1];
      if (!last) return state;

      if (last.action === historyActionTypes.DELETE) {
        return {
          ...state,
          items: [
            ...state.items.map(item => ({ ...item, selected: false })),
            ...last.items
          ],
          history: state.history.slice(0, -1),
        };
      }

      if (last.action === historyActionTypes.ADD) {
        return {
          ...state,
          items: state.items.filter(item => !last.items.some(lastItem => lastItem.id === item.id)),
          history: state.history.slice(0, -1),
        };
      }

      return state;

    default:
      return state;
  }
}
