import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function UsageChart({ title, endpoint, labelKey }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000${endpoint}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [endpoint]);

  const chartData = {
    labels: data.map(r => r[labelKey]),
    datasets: [{
      label: title,
      data: data.map(r => r.count),
      backgroundColor: 'rgba(75,192,192,0.6)'
    }]
  };

  return (
    <div>
      <h2>{title}</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default UsageChart;
