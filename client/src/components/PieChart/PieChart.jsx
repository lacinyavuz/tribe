import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { COLORS } from '../../constants/colors';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/usage`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chartData = {
    labels: data.map(r => r['feature']),
    datasets: [
      {
        data: data.map(r => r.count),
        backgroundColor: COLORS
      }
    ]
  };

  return (
    <div>
      <h2>Usage Distribution per Feature</h2>
      <Pie data={chartData} />
    </div>
  );
}

export default PieChart;
