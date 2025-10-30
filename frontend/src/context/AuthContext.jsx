import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Check if demo mode
      if (token.startsWith('demo-token')) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      } else {
        fetchProfile();
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/profile');
      setUser(res.data);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      return res.data.user;
    } catch (error) {
      // Fallback to demo mode if backend is not available
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        console.log('Backend not available, using demo mode');
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const demoUser = JSON.parse(storedUser);
          setUser(demoUser);
          return demoUser;
        }
        throw new Error('No account found. Please register first.');
      }
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      return res.data.user;
    } catch (error) {
      // Fallback to demo mode if backend is not available
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        console.log('Backend not available, using demo mode');
        const demoUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          role: userData.role
        };
        const demoToken = 'demo-token-' + Date.now();
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        setUser(demoUser);
        return demoUser;
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
