import axios from 'axios';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5002/api/user/loginUser', { email, password });
      const token = response.data.accessToken;
      localStorage.setItem('token', token);
      return token;
    } catch (err) {
      console.error('Login failed', err);
      throw err;
    }
  },

  getUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const response = await axios.get('http://localhost:5002/api/user/getUserInfo',{
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.user;
    } catch (err) {
      console.error('Failed to fetch user information', err);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default AuthService;