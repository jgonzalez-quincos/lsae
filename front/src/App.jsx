// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Certificates from './pages/Certificates';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem' }}>  {/* Added container for content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;