import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FEATURES = ['Tracking', 'Management', 'Security'];
const COLORS = [
  'rgba(75,192,192,0.6)',
  'rgba(54,162,235,0.6)',
  'rgba(255,206,86,0.6)',
  'rgba(255,99,132,0.6)',
  'rgba(153,102,255,0.6)',
  'rgba(201,203,207,0.6)'
];

function FeatureBreakdownChart({ title, groupKey }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/events')
      .then(res => res.json())
      .then(setEvents)
      .catch(console.error);
  }, [groupKey]);

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
