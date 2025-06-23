import { useEffect, useState } from 'react';
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
import './App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState('24'); // hours

  useEffect(() => {
    const start = new Date(Date.now() - Number(range) * 60 * 60 * 1000).toISOString();
    fetch(`/api/usage?start=${start}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [range]);

  const chartData = {
    labels: data.map(r => r.feature),
    datasets: [{
      label: 'Usage count',
      data: data.map(r => r.count),
      backgroundColor: 'rgba(75,192,192,0.6)'
    }]
  };

  return (
    <div className="App">
      <h1>Feature Usage</h1>
      <label>
        Show last
        <select value={range} onChange={e => setRange(e.target.value)}>
          <option value="1">1 hour</option>
          <option value="6">6 hours</option>
          <option value="24">24 hours</option>
        </select>
      </label>
      <Bar data={chartData} />
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.feature}>
              <td>{row.feature}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
