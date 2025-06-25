import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ALL_FEATURES = ['Tracking', 'Management', 'Security'];

function TrendChart({ feature }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = {};
      await Promise.all(
        ALL_FEATURES.map(async f => {
          const params = new URLSearchParams({ feature: f });
          const res = await fetch(`http://localhost:3000/api/trend?${params.toString()}`);
          result[f] = await res.json();
        })
      );
      setData(result);
    };
    fetchData().catch(console.error);
  }, [feature]);

  const colors = [
    'rgba(75,192,192,1)',
    'rgba(255,99,132,1)',
    'rgba(54,162,235,1)'
  ];

  const labels = data[feature]?.map(r => r.hour) || [];
  const datasets = ALL_FEATURES.map((f, idx) => ({
    label: `${f} Usage`,
    data: (data[f] || []).map(r => r.count),
    borderColor: colors[idx % colors.length],
    backgroundColor: colors[idx % colors.length].replace('1)', '0.2)'),
    tension: 0.3
  }));

  const chartData = { labels, datasets };

  return (
    <div>
      <h2>{feature} Trend</h2>
      <Line data={chartData} />
    </div>
  );
}

export default TrendChart;
