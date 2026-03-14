import { describe, expect, it } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';
import '../../main.css';

function renderApp() {
  return render(<Home />);
}

async function finishCloseAnimation(previousClassName?: string) {
  await waitFor(() => {
    const overlay = document.getElementById('add-item-section');
    expect(overlay).toBeInTheDocument();
    if (previousClassName) {
      expect(overlay?.className).not.toBe(previousClassName);
    }
  });

  const overlay = document.getElementById('add-item-section');
  if (overlay) {
    act(() => {
      overlay.dispatchEvent(new Event('animationend', { bubbles: true }));
      fireEvent.animationEnd(overlay);
    });
  }

  await waitFor(() => {
    expect(screen.queryByText('Add item to list')).not.toBeInTheDocument();
  });
}

describe('Home', () => {
  it('renders initial list content', () => {
    renderApp();

    expect(screen.getByText('This a technical proof')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
    expect(screen.queryByText('Add item to list')).not.toBeInTheDocument();
  });

  it('opens the modal when clicking Add', () => {
    renderApp();

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByText('Add item to list')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('focuses the input when opening the modal', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByRole('textbox', { name: 'Add new item' })).toHaveFocus();
  });

  it('starts closing state when clicking Cancel', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Add' }));
    const overlayBefore = document.getElementById('add-item-section');
    const classBefore = overlayBefore?.className;

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByText('Add item to list')).toBeInTheDocument();
    const overlayAfter = document.getElementById('add-item-section');
    expect(overlayAfter).toBeInTheDocument();
    expect(overlayAfter?.className).not.toBe(classBefore);
  });

  it('starts closing state when clicking overlay', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Add' }));
    const overlayBefore = document.getElementById('add-item-section');
    const classBefore = overlayBefore?.className;

    await user.click(overlayBefore as HTMLElement);

    expect(screen.getByText('Add item to list')).toBeInTheDocument();
    const overlayAfter = document.getElementById('add-item-section');
    expect(overlayAfter).toBeInTheDocument();
    expect(overlayAfter?.className).not.toBe(classBefore);
  });

  it('starts closing state when pressing Escape', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Add' }));
    const overlayBefore = document.getElementById('add-item-section');
    const classBefore = overlayBefore?.className;

    await user.keyboard('{Escape}');

    expect(screen.getByText('Add item to list')).toBeInTheDocument();
    const overlayAfter = document.getElementById('add-item-section');
    expect(overlayAfter).toBeInTheDocument();
    expect(overlayAfter?.className).not.toBe(classBefore);
  });

  it('does not close if animation ends without being in closing state', () => {
    renderApp();

    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    const overlay = document.getElementById('add-item-section');
    fireEvent.animationEnd(overlay as HTMLElement);

    expect(screen.getByText('Add item to list')).toBeInTheDocument();
  });

  it('closes the modal after animation ends', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Add' }));
    const overlay = document.getElementById('add-item-section');
    const classBeforeClose = overlay?.className;

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await finishCloseAnimation(classBeforeClose);

    expect(screen.queryByText('Add item to list')).not.toBeInTheDocument();
  });

  it('adds a new item to the list', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Add' }));
    const overlay = document.getElementById('add-item-section');
    const classBeforeClose = overlay?.className;
    await user.type(screen.getByRole('textbox'), 'New item');
    await user.click(screen.getAllByRole('button', { name: 'Add' })[0]);
    await finishCloseAnimation(classBeforeClose);

    expect(screen.queryByText('Add item to list')).not.toBeInTheDocument();
    expect(screen.getByText('New item')).toBeInTheDocument();
  });

  it('selects an item and allows deletion', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByText('Item 2'));
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
  });

  it('selects multiple items and allows deletion', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByText('Item 1'));
    await user.click(screen.getByText('Item 3'));
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();

  });

  it('disables the delete button without selection', () => {
    renderApp();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
  });

  it('disables the undo button without history', () => {
    renderApp();
    expect(screen.getByRole('button', { name: 'Undo action' })).toBeDisabled();
  });

  it('restores deleted items in their original positions on undo', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByText('Item 2'));
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Undo action' }));
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('delete added item with undo', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('button', { name: 'Add' }));
    await user.type(screen.getByRole('textbox'), 'New item');
    await user.click(screen.getAllByRole('button', { name: 'Add' })[0]);

    await user.click(screen.getByRole('button', { name: 'Undo action' }));
    expect(screen.queryByText('New item')).not.toBeInTheDocument();
  });
});
