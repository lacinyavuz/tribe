import { useEffect, useState } from 'react';
import UsageList from './components/UsageList/UsageList.jsx';
import PieChart from './components/PieChart/PieChart.jsx';
import TrendChart from './components/TrendChart/TrendChart.jsx';
import FeatureBreakdownChart from './components/FeatureBreakdownChart/FeatureBreakdownChart.jsx';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/events')
      .then(res => res.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <PieChart title="Usage Distribution per Feature" endpoint="/api/usage" labelKey="feature" />
      <TrendChart />
      <FeatureBreakdownChart title="Feature Usage by Users" events={events} groupKey="user" />
      <FeatureBreakdownChart title="Feature Usage by Accounts" events={events} groupKey="account" />
      <FeatureBreakdownChart title="Feature Usage by Location" events={events} groupKey="location" />

      <UsageList />
    </div>
  );
}

export default App;
