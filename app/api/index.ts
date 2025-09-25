import axios from 'axios';

const api = axios.create({
  baseURL: 'https://edutrack-backend-p3f4.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token dynamically
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
