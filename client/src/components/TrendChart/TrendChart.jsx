import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function TrendChart({ feature }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!feature) return;
    const params = new URLSearchParams({ feature });
    fetch(`http://localhost:3000/api/trend?${params.toString()}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [feature]);

  const chartData = {
    labels: data.map(r => r.hour),
    datasets: [
      {
        label: `${feature} Usage`,
        data: data.map(r => r.count),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.3
      }
    ]
  };

  return (
    <div>
      <h2>{feature} Trend</h2>
      <Line data={chartData} />
    </div>
  );
}

export default TrendChart;
