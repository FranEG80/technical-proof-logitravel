export function init(root = document, dependencies = {}) {
  const { initializeState, actions, checkNodes, render } = dependencies;

  if (!initializeState || !actions || !checkNodes || !render) {
    throw new Error('Missing required app dependencies');
  }

  const modalSection = root.querySelector('#add-item-section');
  const addItemForm = root.querySelector('#add-item-form');
  const addItemInput = root.querySelector('#add-item');
  const list = root.querySelector('#list-section .list');
  const addButton = root.querySelector('.add-button');
  const deleteButton = root.querySelector('.delete-button');
  const undoButton = root.querySelector('.undo-button');
  const cancelButton = root.querySelector('.cancel-button');

  checkNodes(modalSection, addItemForm, addItemInput, list, addButton, deleteButton, undoButton, cancelButton);

  let state = initializeState();
  let errorMessage = '';

  function dispatch(action) {
    state = actions(state, action);
    render(modalSection, addItemForm, addItemInput, list, deleteButton, undoButton, state, errorMessage);
  }

  function setError(message) {
    errorMessage = message;
    render(modalSection, addItemForm, addItemInput, list, deleteButton, undoButton, state, errorMessage);
  }

  function clearDraftAndCloseModal() {
    setError('');
    dispatch({ type: 'DRAFT_CHANGED', payload: '' });
    dispatch({ type: 'MODAL_CLOSE' });
  }

  function handleAddSubmit(event) {
    event.preventDefault();

      const draft = state.draft.name.trim();
      if (!draft) {
        setError('Item cannot be empty');
        return;
      }

      setError('');
      dispatch({ type: 'ADD_ITEM' });
  }

  function handleItemClick(event) {
    const itemElement = event.target.closest('.list-item');
    if (!itemElement || itemElement.dataset.disabled === 'true') return;

      const itemId = itemElement.dataset.id;
      if (!itemId) return;

      dispatch({ type: 'SELECT_ITEM', payload: itemId });
  }

  function handleItemDoubleClick(event) {
    const itemElement = event.target.closest('.list-item');
    if (!itemElement || itemElement.dataset.disabled === 'true') return;

      const itemId = itemElement.dataset.id;
      if (!itemId) return;

      dispatch({ type: 'DELETE_ITEM_BY_ID', payload: itemId });
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' && state.modal.isOpen) {
      clearDraftAndCloseModal();
    }
  }

  addButton.addEventListener('click', () => {
    dispatch({ type: 'MODAL_OPEN' });
  });

  cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearDraftAndCloseModal();
  });

  modalSection.addEventListener('click', (event) => {
    if (event.target === modalSection) {
      clearDraftAndCloseModal();
    }
  });

  addItemForm.addEventListener('submit', handleAddSubmit);

  addItemInput.addEventListener('input', (event) => {
    if (errorMessage) {
      setError('');
    }

    dispatch({ type: 'DRAFT_CHANGED', payload: event.target.value });
  });

  list.addEventListener('click', handleItemClick);
  list.addEventListener('dblclick', handleItemDoubleClick);

  deleteButton.addEventListener('click', () => {
    const isDeleteDisabled = state.items.every((item) => !item.selected);
    if (isDeleteDisabled) return;
    dispatch({ type: 'DELETE_SELECTED' });
  });

  undoButton.addEventListener('click', () => {
    const isUndoDisabled = state.history.length === 0;
    if (isUndoDisabled) return;
    dispatch({ type: 'UNDO' });
  });

  document.addEventListener('keydown', handleKeydown);

  render(modalSection, addItemForm, addItemInput, list, deleteButton, undoButton, state, errorMessage);

  return {
    dispatch,
    getState: () => state,
  };
}
