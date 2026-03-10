import { initializeState, actions } from './assets/js/state.js';

describe('actions', () => {
  test('adds item with trimmed value and clears draft', () => {
    const initialState = {
      ...initializeState(),
      draft: { name: '  New item  ' },
      items: [],
      history: [],
    };

    const nextState = actions(initialState, { type: 'ADD_ITEM' });

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].name).toBe('New item');
    expect(nextState.draft.name).toBe('');
    expect(nextState.history).toHaveLength(1);
  });

  test('does not add empty items', () => {
    const initialState = {
      ...initializeState(),
      draft: { name: '    ' },
      history: [],
    };

    const nextState = actions(initialState, { type: 'ADD_ITEM' });

    expect(nextState).toBe(initialState);
  });

  test('deletes selected items and undo restores at the end (react behavior)', () => {
    const initialState = {
      modal: { isOpen: false },
      draft: { name: '' },
      history: [],
      items: [
        { id: '1', name: 'Item 1', selected: false },
        { id: '2', name: 'Item 2', selected: true },
        { id: '3', name: 'Item 3', selected: false },
        { id: '4', name: 'Item 4', selected: true },
      ],
    };

    const afterDelete = actions(initialState, { type: 'DELETE_SELECTED' });
    expect(afterDelete.items.map((item) => item.id)).toEqual(['1', '3']);

    const afterUndo = actions(afterDelete, { type: 'UNDO' });
    expect(afterUndo.items.map((item) => item.id)).toEqual(['1', '3', '2', '4']);
    expect(afterUndo.history).toHaveLength(0);
  });

  test('undo reverts latest add action', () => {
    const baseState = {
      modal: { isOpen: false },
      draft: { name: '' },
      history: [
        {
          action: 'ADD',
          items: [{ id: '2', name: 'Item 2', selected: false }],
        },
      ],
      items: [
        { id: '1', name: 'Item 1', selected: false },
        { id: '2', name: 'Item 2', selected: false },
      ],
    };

    const afterUndo = actions(baseState, { type: 'UNDO' });

    expect(afterUndo.items.map((item) => item.id)).toEqual(['1']);
    expect(afterUndo.history).toHaveLength(0);
  });
});
