import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../../App'; 

describe('App Component', () => {
  it('renders the Query Builder heading', () => {
    render(<App />);
    expect(screen.getByText('Query Builder')).toBeInTheDocument();
  });

  it('renders the Submit Query button from QueryBuilder', () => {
    render(<App />);
    expect(screen.getByText('✅ Submit Query')).toBeInTheDocument();
  });
});
