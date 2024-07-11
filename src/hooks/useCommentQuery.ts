import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

const useCommentQuery = (id: string, initialCommentData: Tables<'comments'>) => {
  const result = useQuery({
    queryKey: ['comment', id],
    queryFn: async () => {
      const res: AxiosResponse<Tables<'comments'>> = await axios.get(`/api/post/comment/${id}`);
      return res.data;
    },
    initialData: initialCommentData
  });

  return result;
};

export default useCommentQuery;
