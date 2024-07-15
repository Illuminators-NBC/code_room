import { Tables } from '@/types/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const usePostMutation = () => {
  const queryClient = useQueryClient();

  const updatePostMutation = useMutation({
    mutationFn: ({
      id,
      newPost
    }: {
      id: string;
      newPost: Pick<Tables<'post'>, 'content'> & Pick<Partial<Tables<'post'>>, 'image' | 'tag'>;
    }) => {
      return axios.patch(`/api/post/${id}`, newPost);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['post'] })
  });

  const deletePostMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => axios.delete(`/api/post/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    }
  });

  return { updatePostMutation, deletePostMutation };
};

export default usePostMutation;
