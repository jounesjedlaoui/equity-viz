import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './searchBar';
import { test, expect } from 'vitest';

test('updates input value when user types', () => {
  render(<SearchBar />);
  const input = screen.getByPlaceholderText(/Search Symbols/i);
  fireEvent.change(input, { target: { value: 'AAPL' } });
  expect(input.value).toBe('AAPL');
});