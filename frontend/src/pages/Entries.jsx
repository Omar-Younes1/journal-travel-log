import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Entries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/entries')
      .then(res => setEntries(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="list">
      <h2>Your Entries</h2>
      {entries.length === 0 && <p>No entries yet.</p>}
      <ul>
        {entries.map(e => (
          <li key={e._id}>
            <Link to={`/entries/${e._id}`}>
              <strong>{e.title}</strong>
              <span className="date">{new Date(e.date).toLocaleDateString()}</span>
            </Link>
            <Link className="editLink" to={`/entries/${e._id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}