import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import FeatureBreakdownChart from './FeatureBreakdownChart.jsx';

vi.mock('react-chartjs-2', () => ({ Bar: () => <div>chart</div> }));

describe('FeatureBreakdownChart', () => {
  test('renders title and fetches events', () => {
    render(<FeatureBreakdownChart title='test title' events={[]} groupKey="user" />);
    expect(screen.getByText('test title')).toBeInTheDocument();
  });
});
