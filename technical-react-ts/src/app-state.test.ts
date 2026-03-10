import { describe, expect, it } from 'vitest';
import { Subject, firstValueFrom, take, toArray } from 'rxjs';
import {
  createStateStream,
  reducer,
  type Action,
  type State,
} from './app-state';

function buildState(partial?: Partial<State>): State {
  return {
    items: [
      { id: '1', text: 'Item 1' },
      { id: '2', text: 'Item 2' },
    ],
    selectedIds: [],
    inputValue: '',
    isModalOpen: false,
    modalValue: '',
    history: [],
    ...partial,
  };
}

describe('reducer', () => {
  it('no añade strings vacíos o con solo espacios', () => {
    const state = buildState();
    const next = reducer(state, { type: 'ADD_ITEM', text: '   ' });

    expect(next.items).toHaveLength(2);
    expect(next).toBe(state);
  });

  it('hace trim al añadir', () => {
    const state = buildState();
    const next = reducer(state, { type: 'ADD_ITEM', text: '   hola   ' });

    expect(next.items).toHaveLength(3);
    expect(next.items[2].text).toBe('hola');
  });

  it('selecciona un item en modo simple', () => {
    const state = buildState();
    const next = reducer(state, { type: 'SELECT_ITEM', id: '2', multi: false });

    expect(next.selectedIds).toEqual(['2']);
  });

  it('permite multiselección con toggle', () => {
    let state = buildState();

    state = reducer(state, { type: 'SELECT_ITEM', id: '1', multi: true });
    expect(state.selectedIds).toEqual(['1']);

    state = reducer(state, { type: 'SELECT_ITEM', id: '2', multi: true });
    expect(state.selectedIds).toEqual(['1', '2']);

    state = reducer(state, { type: 'SELECT_ITEM', id: '1', multi: true });
    expect(state.selectedIds).toEqual(['2']);
  });

  it('borra los seleccionados', () => {
    const state = buildState({ selectedIds: ['1'] });
    const next = reducer(state, { type: 'DELETE_SELECTED' });

    expect(next.items).toEqual([{ id: '2', text: 'Item 2' }]);
    expect(next.selectedIds).toEqual([]);
    expect(next.history).toHaveLength(1);
  });

  it('no borra nada si no hay selección', () => {
    const state = buildState();
    const next = reducer(state, { type: 'DELETE_SELECTED' });

    expect(next).toBe(state);
  });

  it('borra por id con doble click', () => {
    const state = buildState({ selectedIds: ['2'] });
    const next = reducer(state, { type: 'DELETE_ITEM', id: '2' });

    expect(next.items).toEqual([{ id: '1', text: 'Item 1' }]);
    expect(next.selectedIds).toEqual([]);
  });

  it('abre y cierra modal', () => {
    let state = buildState();

    state = reducer(state, { type: 'OPEN_MODAL' });
    expect(state.isModalOpen).toBe(true);

    state = reducer(state, { type: 'CLOSE_MODAL' });
    expect(state.isModalOpen).toBe(false);
  });

  it('hace undo del último cambio', () => {
    const initial = buildState();
    const afterAdd = reducer(initial, { type: 'ADD_ITEM', text: 'nuevo' });
    const afterUndo = reducer(afterAdd, { type: 'UNDO' });

    expect(afterUndo.items).toEqual(initial.items);
    expect(afterUndo.selectedIds).toEqual(initial.selectedIds);
    expect(afterUndo.history).toHaveLength(0);
  });

  it('ignora undo si no hay history', () => {
    const state = buildState();
    const next = reducer(state, { type: 'UNDO' });

    expect(next).toBe(state);
  });
});

describe('rxjs state stream', () => {
  it('procesa acciones en orden con scan', async () => {
    const initialState = buildState();
    const actions$ = new Subject<Action>();

    const resultPromise = firstValueFrom(
      createStateStream(actions$, initialState).pipe(take(4), toArray())
    );

    actions$.next({ type: 'SET_INPUT', value: '   hola   ' });
    actions$.next({ type: 'ADD_ITEM', text: '   hola   ' });
    actions$.next({ type: 'SELECT_ITEM', id: '1', multi: false });
    actions$.complete();

    const states = await resultPromise;

    expect(states[0].inputValue).toBe('');
    expect(states[1].inputValue).toBe('   hola   ');
    expect(states[2].items[2].text).toBe('hola');
    expect(states[3].selectedIds).toEqual(['1']);
  });

  it('permite add y undo en el stream', async () => {
    const initialState = buildState();
    const actions$ = new Subject<Action>();

    const resultPromise = firstValueFrom(
      createStateStream(actions$, initialState).pipe(take(3), toArray())
    );

    actions$.next({ type: 'ADD_ITEM', text: 'nuevo' });
    actions$.next({ type: 'UNDO' });
    actions$.complete();

    const states = await resultPromise;

    expect(states[1].items).toHaveLength(3);
    expect(states[2].items).toHaveLength(2);
    expect(states[2].items.map((i) => i.text)).toEqual(['Item 1', 'Item 2']);
  });
});
