import axios from 'axios';

export interface DayDto {
  id: string;
  day: string;
}

export interface CreateDayDto {
  day: DayDto;
  message: string;
}

export interface CreateDayBody {
  day: string;
}

export const createDayApi = async (body: CreateDayBody) => {
  const url = '/api/days';

  const { data } = await axios.post<CreateDayDto>(url, body);
  return data;
};
