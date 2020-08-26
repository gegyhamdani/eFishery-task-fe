import useSWR from 'swr';

const useList = params => {
  let query = '';
  if (params) {
    query = `?search=${JSON.stringify(params)}`;
  }
  return useSWR(`/list?${query}`);
};

export default useList;
