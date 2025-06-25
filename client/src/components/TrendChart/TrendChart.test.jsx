import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import TrendChart from './TrendChart.jsx';

vi.mock('react-chartjs-2', () => ({ Line: () => <div>linechart</div> }));
vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ json: () => Promise.resolve([]) })));

describe('TrendChart', () => {
  test('renders feature name and fetches data for all features', () => {
    render(<TrendChart />);
    expect(screen.getByText(/Trends/)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(3);
  });
});
