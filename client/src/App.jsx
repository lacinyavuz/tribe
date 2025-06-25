import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import UsageList from './components/UsageList/UsageList.jsx';
import './App.css';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/usage')
      .then(res => res.json())
      .then(setTrendData)
      .catch(console.error);
  }, []);

  const chartData = {
    labels: trendData.map(r => r.feature),
    datasets: [{
      label: 'Usage count',
      data: trendData.map(r => r.count),
      backgroundColor: 'rgba(75,192,192,0.6)'
    }]
  };

  return (
    <div className="App">
      <Bar data={chartData} />
      <UsageList />
    </div>
  );
}

export default App;
