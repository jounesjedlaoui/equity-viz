import { render } from '@testing-library/react';
import { test } from 'vitest'
import DataDisplay from './dataDisplay';

test('renders DataDisplay without crashing', () => {
  render(<DataDisplay type="candlestick" ticker="AAPL" />);
});