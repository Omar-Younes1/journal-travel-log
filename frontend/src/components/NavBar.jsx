import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { token, logout, user } = useAuth();
  return (
    <nav className="nav">
      <Link to="/entries" className="logo">Journal</Link>
      <div className="spacer" />
      {!token && (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      {token && (
        <>
          <span className="user">{user?.username}</span>
            <Link to="/entries/new">New</Link>
          <button onClick={logout} className="linkLike">Logout</button>
        </>
      )}
    </nav>
  );
}