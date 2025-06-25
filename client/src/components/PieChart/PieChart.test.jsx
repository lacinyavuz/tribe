import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import PieChart from './PieChart.jsx';

vi.mock('react-chartjs-2', () => ({ Pie: () => <div>piechart</div> }));

describe('PieChart', () => {
  test('renders title', () => {
    render(<PieChart />);
    expect(screen.getByText('Usage Distribution per Feature')).toBeInTheDocument();
  });
});
