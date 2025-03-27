import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const login = async () => {
  await api.post('/auth/login', { email, password });
  navigate('/certificates');  // Redirect after success
};