import UsageList from './components/UsageList/UsageList.jsx';
import UsageChart from './components/UsageChart/UsageChart.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <UsageChart title="Feature Usage" endpoint="/api/usage" labelKey="feature" />
      <UsageChart title="Usage by User" endpoint="/api/users" labelKey="user" />
      <UsageChart title="Usage by Account" endpoint="/api/accounts" labelKey="account" />
      <UsageChart title="Usage by Location" endpoint="/api/locations" labelKey="location" />
      <UsageList />
    </div>
  );
}

export default App;
