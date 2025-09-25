import api from './index';

export const getAttendance = async (studentId: string, filterType = 'WEEK', termId?: string) => {
  const params = new URLSearchParams({ studentId, filterType });
  if (filterType === 'TERM' && termId) params.append('termId', termId);

  const res = await api.get(`/api/mobile/attendance-record?${params.toString()}`);
  return res.data;
};
