// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      {/* Test with inline styles first */}
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
      <Link to="/certificates">Certificates</Link>
    </nav>
  );
}