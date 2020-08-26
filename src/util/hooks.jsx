import useSWR from 'swr';

const useList = params => {
  let query = '';
  if (params) {
    query = `?search=${JSON.stringify(params)}`;
  }
  return useSWR(`/list?${query}`);
};

const useArea = () => {
  return useSWR('/option_area');
};

export { useList, useArea };
