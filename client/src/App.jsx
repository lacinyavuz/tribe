import UsageList from './components/UsageList/UsageList.jsx';
import UsageChart from './components/UsageChart/UsageChart.jsx';
import PieChart from './components/PieChart/PieChart.jsx';
import TrendChart from './components/TrendChart/TrendChart.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <UsageChart title="Feature Usage" endpoint="/api/usage" labelKey="feature" />
      <UsageChart title="Usage by User" endpoint="/api/users" labelKey="user" />
      <UsageChart title="Usage by Account" endpoint="/api/accounts" labelKey="account" />
      <UsageChart title="Usage by Location" endpoint="/api/locations" labelKey="location" />
      <PieChart title="Usage Distribution" endpoint="/api/usage" labelKey="feature" />
      <TrendChart feature="Tracking" />
      <UsageList />
    </div>
  );
}

export default App;
