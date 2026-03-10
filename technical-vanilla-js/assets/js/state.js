const HISTORY_ACTIONS = {
  ADD: 'ADD',
  DELETE: 'DELETE',
};

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `item-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function initializeState() {
  return {
    modal: {
      isOpen: false,
    },
    draft: {
      name: '',
    },
    items: [
      { id: createId(), name: 'Item 1', selected: false },
      { id: createId(), name: 'Item 2', selected: false },
      { id: createId(), name: 'Item 3', selected: false },
    ],
    history: [],
  };
}

function updateHistoryAdd(state, newItem) {
  return [
    ...state.history,
    {
      action: HISTORY_ACTIONS.ADD,
      items: [{ ...newItem }],
    },
  ];
}

function updateHistoryDelete(state, deletedItems) {
  return [
    ...state.history,
    {
      action: HISTORY_ACTIONS.DELETE,
      items: deletedItems,
    },
  ];
}

function restoreDeletedItems(items, deletedItems) {
  return [
    ...items.map((item) => ({ ...item, selected: false })),
    ...deletedItems,
  ];
}

export function actions(state, action) {
  switch (action.type) {
      case 'MODAL_OPEN':
        return {
          ...state,
          modal: { isOpen: true },
        };

      case 'MODAL_CLOSE':
        return {
          ...state,
          modal: { isOpen: false },
        };

      case 'DRAFT_CHANGED':
        return {
          ...state,
          draft: {
            name: action.payload,
          },
        };

      case 'ADD_ITEM': {
        const itemName = state.draft.name.trim();
        if (!itemName) return state;

        const newItem = {
          id: createId(),
          name: itemName,
          selected: false,
        };

        return {
          ...state,
          items: [...state.items, newItem],
          draft: { name: '' },
          modal: { isOpen: false },
          history: updateHistoryAdd(state, newItem),
        };
      }

      case 'SELECT_ITEM':
        return {
          ...state,
          items: state.items.map((item) => (
            item.id === action.payload
              ? { ...item, selected: !item.selected }
              : item
          )),
        };

      case 'DELETE_SELECTED': {
        const selectedItemsWithIndex = state.items
          .filter((item) => item.selected);

        if (selectedItemsWithIndex.length === 0) return state;

        return {
          ...state,
          items: state.items.filter((item) => !item.selected),
          history: updateHistoryDelete(state, selectedItemsWithIndex),
        };
      }

      case 'DELETE_ITEM_BY_ID': {
        const deleted = state.items.find((item) => item.id === action.payload);
        if (!deleted) return state;
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
          history: updateHistoryDelete(state, [{ ...deleted }]),
        };
      }

      case 'UNDO': {
        if (state.history.length === 0) return state;

        const lastHistory = state.history[state.history.length - 1];
        const nextHistory = state.history.slice(0, -1);

        if (lastHistory.action === HISTORY_ACTIONS.ADD) {
          const idsToRemove = new Set(lastHistory.items.map((item) => item.id));
          return {
            ...state,
            items: state.items.filter((item) => !idsToRemove.has(item.id)),
            history: nextHistory,
          };
        }

        if (lastHistory.action === HISTORY_ACTIONS.DELETE) {
          return {
            ...state,
            items: restoreDeletedItems(state.items, lastHistory.items),
            history: nextHistory,
          };
        }

        return state;
      }

    default:
      return state;
  }
}
