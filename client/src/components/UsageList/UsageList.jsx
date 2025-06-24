import { useEffect, useState } from 'react';
import './UsageList.css';

function UsageList() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState('24');
  const [feature, setFeature] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const start = new Date(Date.now() - Number(range) * 60 * 60 * 1000).toISOString();
    const params = new URLSearchParams({ start });
    if (feature) params.append('feature', feature);
    if (location) params.append('location', location);
    fetch(`/api/usage?${params.toString()}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [range, feature, location]);

  return (
    <div>
      <h1>Feature Usage</h1>
      <div className="filters">
        <label>
          Show last
          <select value={range} onChange={e => setRange(e.target.value)}>
            <option value="1">1 hour</option>
            <option value="6">6 hours</option>
            <option value="24">24 hours</option>
          </select>
        </label>
        <label>
          Feature
          <input value={feature} onChange={e => setFeature(e.target.value)} />
        </label>
        <label>
          Location
          <input value={location} onChange={e => setLocation(e.target.value)} />
        </label>
      </div>
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

export default UsageList;
