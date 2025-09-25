import api from './index';

export const getUserByEmail = async (email: string) => {
  const res = await api.get(`/api/mobile/user-profile?email=${email}`);
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch("https://edutrack-backend-p3f4.onrender.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  console.log("LOGIN RESPONSE:", data); // <--- Add this line
  return data;
};

export const registerUser = async (data: any) => {
  const res = await api.post('/api/auth/register', data);
  return res.data;
};

export const refreshTokenApi = async (refreshToken: string) => {
  const res = await fetch("https://edutrack-backend-p3f4.onrender.com/api/auth/refresh-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  return res.json();
};

export const logoutUser = async (refreshToken: string) => {
  const res = await api.post('/api/auth/logout', { refreshToken });
  return res.data;
};
