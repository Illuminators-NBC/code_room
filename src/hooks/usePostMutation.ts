import { Tables } from '@/types/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const usePostMutation = () => {
  const queryClient = useQueryClient();

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, newPost }: { id: string; newPost: Tables<'post'> }) => {
      return axios.patch(`/api/post/${id}`, { newPost });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post'] })
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => axios.delete(`/api/post/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    }
  });

  return { updateCommentMutation, deleteCommentMutation };
};

export default usePostMutation;
