import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const usePostQuery = (id: string, initialPostData?: Tables<'post'>[]) => {
  const result = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await axios.get(`/api/post/${id}`);
      console.log(res);

      return res.data;
    },
    initialData: initialPostData ? initialPostData : []
  });

  return result;
};

export default usePostQuery;
