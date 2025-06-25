import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const userColors = ['rgba(75,192,192,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)'];
const accountColors = ['rgba(255,99,132,0.6)', 'rgba(153,102,255,0.6)', 'rgba(201,203,207,0.6)'];
const locationColors = ['rgba(255,159,64,0.6)', 'rgba(99,255,132,0.6)', 'rgba(255,205,86,0.6)'];
const totalColor = 'rgba(0,0,0,0.8)';

function FeatureBreakdownChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const usageRes = await fetch('http://localhost:3000/api/usage');
      const usage = await usageRes.json();
      const features = usage.map(u => u.feature);
      const dataMap = {};
      for (const f of features) {
        const [usersRes, accountsRes, locationsRes] = await Promise.all([
          fetch(`http://localhost:3000/api/users?feature=${encodeURIComponent(f)}`),
          fetch(`http://localhost:3000/api/accounts?feature=${encodeURIComponent(f)}`),
          fetch(`http://localhost:3000/api/locations?feature=${encodeURIComponent(f)}`)
        ]);
        const [users, accounts, locations] = await Promise.all([
          usersRes.json(),
          accountsRes.json(),
          locationsRes.json()
        ]);
        const total = usage.find(u => u.feature === f)?.count || 0;
        dataMap[f] = { total, users, accounts, locations };
      }

      const labels = features;
      const datasets = [];
      features.forEach((feature, idx) => {
        const d = dataMap[feature];
        const baseArray = new Array(features.length).fill(0);
        const totalData = baseArray.slice();
        totalData[idx] = d.total;
        datasets.push({
          label: `${feature} Total`,
          stack: `${feature}-total`,
          data: totalData,
          backgroundColor: totalColor
        });
        d.users.forEach((u, uIdx) => {
          const arr = baseArray.slice();
          arr[idx] = u.count;
          datasets.push({
            label: `${feature} User: ${u.user}`,
            stack: `${feature}-user`,
            data: arr,
            backgroundColor: userColors[uIdx % userColors.length]
          });
        });
        d.accounts.forEach((a, aIdx) => {
          const arr = baseArray.slice();
          arr[idx] = a.count;
          datasets.push({
            label: `${feature} Account: ${a.account}`,
            stack: `${feature}-account`,
            data: arr,
            backgroundColor: accountColors[aIdx % accountColors.length]
          });
        });
        d.locations.forEach((l, lIdx) => {
          const arr = baseArray.slice();
          arr[idx] = l.count;
          datasets.push({
            label: `${feature} Location: ${l.location}`,
            stack: `${feature}-location`,
            data: arr,
            backgroundColor: locationColors[lIdx % locationColors.length]
          });
        });
      });

      setChartData({ labels, datasets });
    };

    fetchData().catch(console.error);
  }, []);

  const options = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
  };

  return (
    <div>
      <h2>Feature Usage</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default FeatureBreakdownChart;
