import { render } from '@testing-library/react'
import App from './App'
import { test, expect } from 'vitest';

test('renders without crashing', () => {
  render(<App />)
})
