import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

const useCommentQuery = (postId: string, initialCommentData: Tables<'comments'>[]) => {
  const result = useQuery({
    queryKey: ['comment', postId],
    queryFn: async () => {
      const res: AxiosResponse<Tables<'comments'>[]> = await axios.get(`/api/post/comment/${postId}`);
      return res.data;
    },
    initialData: initialCommentData ? initialCommentData : []
  });

  return result;
};

export default useCommentQuery;
