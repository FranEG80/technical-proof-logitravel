import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import Home from './Home';
import { theme } from '../../shared/styles/theme';

function renderApp() {
  return render(
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
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
});
