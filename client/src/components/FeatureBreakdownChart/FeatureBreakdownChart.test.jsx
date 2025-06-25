import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import FeatureBreakdownChart from './FeatureBreakdownChart.jsx';

vi.mock('react-chartjs-2', () => ({ Bar: () => <div>chart</div> }));
vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ json: () => Promise.resolve([]) })));

describe('FeatureBreakdownChart', () => {
  test('renders title', () => {
    render(<FeatureBreakdownChart />);
    expect(screen.getByText('Feature Usage')).toBeInTheDocument();
  });
});
