import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { COLORS } from '../../constants/colors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FEATURES = ['Tracking', 'Management', 'Security'];

function FeatureBreakdownChart({ title, events, groupKey }) {
  const categories = Array.from(new Set(events.map(e => e[groupKey] || 'Unknown')));
  const datasets = categories.map((cat, idx) => ({
    label: cat,
    data: FEATURES.map(f =>
      events.filter(e => e.feature === f && (e[groupKey] || 'Unknown') === cat).length
    ),
    backgroundColor: COLORS[idx % COLORS.length]
  }));

  const chartData = {
    labels: FEATURES,
    datasets
  };

  const options = {
    scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
  };

  return (
    <div>
      <h2>{title}</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default FeatureBreakdownChart;
