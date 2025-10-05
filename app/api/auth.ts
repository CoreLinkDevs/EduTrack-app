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

export const refreshToken = async (refreshToken: string) => {
  const BASE_URL = "https://edutrack-backend-p3f4.onrender.com";
  const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) throw new Error("Refresh token failed");
  return res.json();
};

export const logoutUser = async (refreshToken: string) => {
  const res = await api.post('/api/auth/logout', { refreshToken });
  return res.data;
};
