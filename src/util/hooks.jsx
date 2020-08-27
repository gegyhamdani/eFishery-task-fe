import useSWR, { mutate } from 'swr';
import api from '../services/api';

const useList = params => {
  let query = '';
  if (params) {
    query = `?search=${JSON.stringify(params)}`;
  }
  return useSWR(`/list?${query}`, {
    revalidateOnMount: true
  });
};

const useArea = () => {
  return useSWR('/option_area');
};

const saveData = async payload => {
  try {
    const res = await api.post('/list', payload);
    await mutate('/list');
    return res.data;
  } catch (error) {
    throw Error(error);
  }
};

export { useList, useArea, saveData };
