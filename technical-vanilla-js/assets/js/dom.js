export function checkNodes(modalSection, addItemForm, addItemInput, list, addButton, deleteButton, undoButton, cancelButton) {
  if (!modalSection || !addItemForm || !addItemInput || !list || !addButton || !deleteButton || !undoButton || !cancelButton) {
    throw new Error('Missing required DOM nodes to initialize app');
  }
}

function renderList(list, state) {
  list.textContent = '';

  if (state.items.length === 0) {
    const emptyElement = document.createElement('div');
    emptyElement.className = 'list-item';
    emptyElement.dataset.disabled = 'true';
    emptyElement.textContent = 'No items yet';
    list.appendChild(emptyElement);
    return;
  }

  const fragment = document.createDocumentFragment();

  state.items.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.className = `list-item${item.selected ? ' is-selected' : ''}`;
    itemElement.dataset.id = item.id;
    itemElement.textContent = item.name;
    fragment.appendChild(itemElement);
  });

  list.appendChild(fragment);
}

function renderButtons(deleteButton, undoButton, state) {
  const deleteDisabled = state.items.every((item) => !item.selected);
  const undoDisabled = state.history.length === 0;

  deleteButton.disabled = deleteDisabled;
  deleteButton.setAttribute('aria-disabled', String(deleteDisabled));

  undoButton.disabled = undoDisabled;
  undoButton.setAttribute('aria-disabled', String(undoDisabled));
}

function ensureErrorNode(addItemForm, addItemInput) {
  const existing = addItemForm.querySelector('#add-item-error');
  if (existing) return existing;

  const errorElement = document.createElement('p');
  errorElement.id = 'add-item-error';
  errorElement.setAttribute('role', 'alert');
  errorElement.style.color = 'var(--red)';
  errorElement.style.fontSize = '14px';
  errorElement.style.lineHeight = '20px';
  errorElement.style.marginTop = '8px';

  addItemInput.insertAdjacentElement('afterend', errorElement);
  return errorElement;
}

function renderError(addItemForm, addItemInput, errorMessage) {
  const errorElement = ensureErrorNode(addItemForm, addItemInput);
  errorElement.textContent = errorMessage;
  errorElement.hidden = errorMessage.length === 0;
}

function renderModal(modalSection, addItemInput, state) {
  modalSection.hidden = !state.modal.isOpen;
  modalSection.setAttribute('aria-hidden', String(!state.modal.isOpen));

  if (state.modal.isOpen) {
    addItemInput.focus();
  }
}

function renderDraft(addItemInput, state) {
  addItemInput.value = state.draft.name;
}

export function render(modalSection, addItemForm, addItemInput, list, deleteButton, undoButton, state, errorMessage) {
  renderList(list, state);
  renderButtons(deleteButton, undoButton, state);
  renderModal(modalSection, addItemInput, state);
  renderDraft(addItemInput, state);
  renderError(addItemForm, addItemInput, errorMessage);
}
