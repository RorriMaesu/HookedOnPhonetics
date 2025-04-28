import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the components to simplify testing
vi.mock('./components/Layout', () => ({
  default: ({ children }) => <div data-testid="layout">{children}</div>,
}));

vi.mock('./pages/Dashboard', () => ({
  default: () => <div data-testid="dashboard">Dashboard Page</div>,
}));

describe('App', () => {
  it('renders the app with router', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Since we're mocking the components, we just need to verify the router is working
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
