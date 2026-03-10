import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  createInitialState,
  createStateStream,
  type State,
  type Action,
} from './app-state';

export default function App() {
  const initialState = useMemo(() => createInitialState(), []);
  const actions$ = useMemo(() => new Subject<Action>(), []);
  const state$ = useMemo(() => new BehaviorSubject<State>(initialState), [initialState]);
  const [state, setState] = useState<State>(initialState);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sub = createStateStream(actions$, initialState).subscribe((nextState) => {
      state$.next(nextState);
      setState(nextState);
    });

    return () => {
      sub.unsubscribe();
      actions$.complete();
      state$.complete();
    };
  }, [actions$, state$, initialState]);

  useEffect(() => {
    if (!state.isModalOpen) return;

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const getFocusableElements = () => {
      if (!modalRef.current) return [] as HTMLElement[];
      return Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('disabled'));
    };

    const focusableElements = getFocusableElements();
    focusableElements[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        actions$.next({ type: 'CLOSE_MODAL' });
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const elements = getFocusableElements();
        if (elements.length === 0) return;

        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];
        const activeElement = document.activeElement as HTMLElement | null;

        if (event.shiftKey) {
          if (activeElement === firstElement || !modalRef.current.contains(activeElement)) {
            event.preventDefault();
            lastElement.focus();
          }
          return;
        }

        if (activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (modalRef.current && !modalRef.current.contains(target)) {
        actions$.next({ type: 'CLOSE_MODAL' });
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [state.isModalOpen, actions$]);

  const canDelete = state.selectedIds.length > 0;
  const canUndo = state.history.length > 0;
  const canAddFromModal = state.modalValue.trim().length > 0;

  const handleAddFromMainInput = () => {
    actions$.next({ type: 'ADD_ITEM', text: state.inputValue });
  };

  const handleMainInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddFromMainInput();
    }
  };

  const handleModalAdd = () => {
    actions$.next({ type: 'ADD_ITEM', text: state.modalValue });
  };

  const handleModalKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleModalAdd();
    }
  };

  return (
    <div className="page">
      <div className={`card ${state.isModalOpen ? 'card--dimmed' : ''}`}>
        <h1 className="title">This is a technical proof</h1>

        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos.
          Lacinia habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere augue
          fames dictumst placerat porttitor, dis mi pharetra vestibulum venenatis phasellus.
        </p>

        <div className="input-inline">
          <input
            type="text"
            className="text-input"
            aria-label="Add item from main input"
            placeholder="Type here and press Enter..."
            value={state.inputValue}
            onChange={(e) => actions$.next({ type: 'SET_INPUT', value: e.target.value })}
            onKeyDown={handleMainInputKeyDown}
          />
          <button className="btn btn--ghost" onClick={handleAddFromMainInput}>
            QUICK ADD
          </button>
        </div>

        <div className="list-box" role="listbox" aria-label="Items list" aria-multiselectable="true">
          {state.items.length === 0 ? (
            <div className="empty-state">No items</div>
          ) : (
            state.items.map((item) => {
              const selected = state.selectedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`list-item ${selected ? 'list-item--selected' : ''}`}
                  role="option"
                  tabIndex={0}
                  aria-selected={selected}
                  onClick={(e) =>
                    actions$.next({
                      type: 'SELECT_ITEM',
                      id: item.id,
                      multi: e.ctrlKey || e.metaKey,
                    })
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      actions$.next({
                        type: 'SELECT_ITEM',
                        id: item.id,
                        multi: event.ctrlKey || event.metaKey,
                      });
                    }

                    if (event.key === 'Delete' || event.key === 'Backspace') {
                      event.preventDefault();
                      actions$.next({ type: 'DELETE_ITEM', id: item.id });
                    }
                  }}
                  onDoubleClick={() => actions$.next({ type: 'DELETE_ITEM', id: item.id })}
                >
                  {item.text}
                </div>
              );
            })
          )}
        </div>

        <div className="actions">
          <div className="actions-left">
            <button
              className="btn btn--ghost btn--icon"
              onClick={() => actions$.next({ type: 'UNDO' })}
              disabled={!canUndo}
              aria-label="Undo"
              title="Undo"
            >
              ↺
            </button>

            <button
              className="btn btn--ghost"
              onClick={() => actions$.next({ type: 'DELETE_SELECTED' })}
              disabled={!canDelete}
            >
              DELETE
            </button>
          </div>

          <button
            className="btn btn--primary"
            onClick={() => actions$.next({ type: 'OPEN_MODAL' })}
          >
            ADD
          </button>
        </div>
      </div>

      {state.isModalOpen && (
        <div className="modal-overlay" data-testid="modal-overlay">
          <div
            ref={modalRef}
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-item-modal-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h2 id="add-item-modal-title" className="modal-title">
              Add item to list
            </h2>

            <input
              autoFocus
              type="text"
              className="text-input"
              aria-label="Add item from modal input"
              placeholder="Type the text here..."
              value={state.modalValue}
              onChange={(e) => actions$.next({ type: 'SET_MODAL_INPUT', value: e.target.value })}
              onKeyDown={handleModalKeyDown}
            />

            <div className="modal-actions">
              <button
                className="btn btn--primary"
                onClick={handleModalAdd}
                disabled={!canAddFromModal}
              >
                ADD
              </button>

              <button
                className="btn btn--ghost"
                onClick={() => actions$.next({ type: 'CLOSE_MODAL' })}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
