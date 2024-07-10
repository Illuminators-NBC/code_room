import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCommentQuery = (id: string, initialCommentData: Tables<'comments'>) => {
  const result = useQuery({
    queryKey: ['comment', id],
    queryFn: async () => {
      const res = await axios.get(`/api/post/comment/${id}`);
      return res.data[0];
    },
    initialData: initialCommentData
  });

  return result;
};

export default useCommentQuery;
