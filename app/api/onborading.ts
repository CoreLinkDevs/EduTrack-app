import api from './index';

export const getOnboardingData = async (userId: string) => {
  const res = await api.get(`/api/mobile/onboarding?userId=${userId}`);
  return res.data;
};
