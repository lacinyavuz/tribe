import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { COLORS } from '../../constants/colors';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ALL_FEATURES = ['Tracking', 'Management', 'Security'];

function TrendChart() {
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
  }, []);

  const labels = Object.values(data)[0]?.map(r => r.hour) || [];
  const datasets = ALL_FEATURES.map((f, idx) => ({
    label: `${f} Usage`,
    data: (data[f] || []).map(r => r.count),
    borderColor: COLORS[idx % COLORS.length],
  }));

  return (
    <div>
      <h2>Trends</h2>
      <Line data={{ labels, datasets }} />
    </div>
  );
}

export default TrendChart;
