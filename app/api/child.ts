import api from './index';

export const getChildProfile = async (studentId: string) => {
  const res = await api.get(`/api/mobile/child-profile?studentId=${studentId}`);
  return res.data;
};

export const getHomeScreenData = async (parentId: string) => {
  const res = await api.get(`/api/mobile/home-screen?parentId=${parentId}`);
  return res.data;
};
