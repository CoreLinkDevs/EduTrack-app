import api from './index';

export const getTimeTable = async (studentId: string, date?: string, week = true) => {
  const params = new URLSearchParams({ studentId, week: String(week) });
  if (date) params.append('date', date);

  const res = await api.get(`/api/mobile/time-table?${params.toString()}`);
  return res.data;
};
