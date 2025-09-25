import api from './index';

export const getAcademicCalendar = async (schoolId: string, startDate?: string, endDate?: string, types?: string) => {
  const params = new URLSearchParams({ schoolId });
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  if (types) params.append('types', types);

  const res = await api.get(`/api/mobile/academic-calendar?${params.toString()}`);
  return res.data;
};
