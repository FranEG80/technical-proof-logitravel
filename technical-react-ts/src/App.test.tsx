import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

vi.mock('./features/home', () => ({
  default: () => <main data-testid="home-view">Home view</main>,
}));

describe('App', () => {
  it('starts the app and renders content', () => {
    const { container } = render(<App />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders Home from App composition', () => {
    render(<App />);
    expect(screen.getByTestId('home-view')).toBeInTheDocument();
  });
});
