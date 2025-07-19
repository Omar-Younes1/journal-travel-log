import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function EntryView() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    api.get(`/entries/${id}`)
      .then(res => setEntry(res.data))
      .catch(() => setError('Not found'));
  }, [id]);

  const del = async () => {
    if (!window.confirm('Delete this entry?')) return;
    await api.delete(`/entries/${id}`);
    nav('/entries');
  };

  if (error) return <div className="card"><p>{error}</p></div>;
  if (!entry) return <div>Loading...</div>;

  return (
    <div className="card">
      <h2>{entry.title}</h2>
      <p className="muted">
        {new Date(entry.date).toLocaleDateString()} {entry.location && `• ${entry.location}`}
      </p>
      {entry.imageUrl && <img alt="" src={entry.imageUrl} style={{ maxWidth:'100%', margin:'1rem 0' }}/>}      
      <p style={{ whiteSpace: 'pre-line' }}>{entry.content}</p>
      <div className="row">
        <Link to={`/entries/${entry._id}/edit`}>Edit</Link>
        <button onClick={del} className="danger">Delete</button>
      </div>
    </div>
  );
}