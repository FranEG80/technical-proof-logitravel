import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './BORRAR';

describe('App', () => {
  it('render initial items', () => {
    render(<App />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
    expect(screen.getByText('Item 4')).toBeInTheDocument();
  });

  it('adds an item from the main input with Enter and trims', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText('Type here and press Enter...');
    await user.type(input, '   New item   {enter}');

    expect(screen.getByText('New item')).toBeInTheDocument();
  });

  it('does not add an empty item from the main input', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getAllByText(/Item \d/)).toHaveLength(4);

    const input = screen.getByPlaceholderText('Type here and press Enter...');
    await user.type(input, '     ');
    await user.click(screen.getByRole('button', { name: 'QUICK ADD' }));

    expect(screen.getAllByText(/Item \d/)).toHaveLength(4);
  });

  it('opens the modal and adds an item', async () => {
    const user = userEvent.setup();
    render(<App />);

    const addButtons = screen.getAllByRole('button', { name: 'ADD' });
    await user.click(addButtons[0]);

    const modalInput = screen.getByPlaceholderText('Type the text here...');
    await user.type(modalInput, 'From modal');
    await user.click(screen.getAllByRole('button', { name: 'ADD' })[1]);

    expect(screen.queryByText('Add item to list')).not.toBeInTheDocument();
    expect(screen.getByText('From modal')).toBeInTheDocument();
  });

  it('closes the modal with Cancel', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: 'ADD' })[0]);
    expect(screen.getByText('Add item to list')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'CANCEL' }));
    expect(screen.queryByText('Add item to list')).not.toBeInTheDocument();
  });

  it('closes the modal with Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: 'ADD' })[0]);
    expect(screen.getByText('Add item to list')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByText('Add item to list')).not.toBeInTheDocument();
  });

  it('selects an item and allows deletion', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByText('Item 2'));
    await user.click(screen.getByRole('button', { name: 'DELETE' }));

    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
  });

  it('disables the delete button without selection', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: 'DELETE' })).toBeDisabled();
  });

  it('allows multi-selection with ctrl+click', () => {
    render(<App />);

    const item1 = screen.getByText('Item 1');
    const item2 = screen.getByText('Item 2');

    fireEvent.click(item1, { ctrlKey: true });
    fireEvent.click(item2, { ctrlKey: true });

    expect(item1).toHaveClass('list-item--selected');
    expect(item2).toHaveClass('list-item--selected');
  });

  it('deletes an item with double click', () => {
    render(<App />);

    fireEvent.doubleClick(screen.getByText('Item 3'));

    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
  });

  it('undos the last change', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByText('Item 4'));
    await user.click(screen.getByRole('button', { name: 'DELETE' }));

    expect(screen.queryByText('Item 4')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Undo' }));

    expect(screen.getByText('Item 4')).toBeInTheDocument();
  });

  it('disables the add button in the modal when empty', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: 'ADD' })[0]);

    const modal = screen.getByText('Add item to list').closest('.modal') as HTMLElement;
    const addButton = within(modal).getByRole('button', { name: 'ADD' });

    expect(addButton).toBeDisabled();
  });
});
