import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function EntryForm({ edit }) {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().slice(0,10),
    location: '',
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    if (edit && id) {
      api.get(`/entries/${id}`).then(res => {
        const e = res.data;
        setForm({
          title: e.title,
          content: e.content,
          date: e.date ? e.date.slice(0,10) : '',
          location: e.location || '',
          imageUrl: e.imageUrl || ''
        });
      }).catch(() => setError('Failed to load entry'));
    }
  }, [edit, id]);

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form, date: form.date ? new Date(form.date) : undefined };
      if (edit) {
        await api.put(`/entries/${id}`, payload);
      } else {
        await api.post('/entries', payload);
      }
      nav('/entries');
    } catch (err) {
      setError(err?.response?.data?.error || 'Save failed');
    }
  };

  return (
    <div className="card">
      <h2>{edit ? 'Edit Entry' : 'New Entry'}</h2>
      <form onSubmit={submit}>
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={e => setForm({ ...form, imageUrl: e.target.value })}
        />
        <textarea
          required
          placeholder="Content..."
          rows={8}
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        />
        {error && <div className="error">{error}</div>}
        <button>{edit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}