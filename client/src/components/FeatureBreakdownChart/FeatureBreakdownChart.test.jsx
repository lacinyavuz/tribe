import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import FeatureBreakdownChart from './FeatureBreakdownChart.jsx';

vi.mock('react-chartjs-2', () => ({ Bar: () => <div>chart</div> }));
vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ json: () => Promise.resolve([]) })));

describe('FeatureBreakdownChart', () => {
  test('renders title and fetches events', () => {
    render(<FeatureBreakdownChart title="Test Chart" groupKey="user" />);
    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/events');
  });
});
