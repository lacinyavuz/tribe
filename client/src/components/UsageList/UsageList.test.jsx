import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import UsageList from './UsageList.jsx';

vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ json: () => Promise.resolve([]) })));

describe('UsageList', () => {
  test('renders filters', () => {
    render(<UsageList />);
    expect(screen.getByLabelText(/feature/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
  });
});
