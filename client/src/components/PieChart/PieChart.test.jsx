import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import PieChart from './PieChart.jsx';

vi.mock('react-chartjs-2', () => ({ Pie: () => <div>piechart</div> }));
vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ json: () => Promise.resolve([]) })));

describe('PieChart', () => {
  test('renders title', () => {
    render(<PieChart title="Test Pie" endpoint="/test" labelKey="feature" />);
    expect(screen.getByText('Test Pie')).toBeInTheDocument();
  });
});
