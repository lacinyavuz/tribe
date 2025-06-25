import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ title, endpoint, labelKey }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000${endpoint}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [endpoint]);

  const chartData = {
    labels: data.map(r => r[labelKey]),
    datasets: [
      {
        data: data.map(r => r.count),
        backgroundColor: [
          'rgba(75,192,192,0.6)',
          'rgba(54,162,235,0.6)',
          'rgba(255,206,86,0.6)',
          'rgba(255,99,132,0.6)',
          'rgba(153,102,255,0.6)',
          'rgba(201,203,207,0.6)'
        ]
      }
    ]
  };

  return (
    <div>
      <h2>{title}</h2>
      <Pie data={chartData} />
    </div>
  );
}

export default PieChart;
