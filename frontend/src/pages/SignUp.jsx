import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      await signup(form.username, form.password);
      nav('/login');
    } catch (err) {
      setError(err?.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="card">
      <h2>Sign Up</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        {error && <div className="error">{error}</div>}
        <button>Create Account</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}