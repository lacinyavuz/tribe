import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import UsageChart from './UsageChart.jsx';

vi.mock('react-chartjs-2', () => ({ Bar: () => <div>chart</div> }));

vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ json: () => Promise.resolve([]) })));

describe('UsageChart', () => {
  test('renders title', () => {
    render(<UsageChart title="Test" endpoint="/test" labelKey="user" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
