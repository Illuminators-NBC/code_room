import { Tables } from '@/types/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useCommentMutation = () => {
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: ({ id, newComment }: { id: string; newComment: Pick<Tables<'comments'>, 'post_id' | 'content'> }) => {
      return axios.post(`/api/post/comment/${id}`, newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    }
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({
      id,
      commentId,
      newCommentContent
    }: {
      id: string;
      commentId: Tables<'comments'>['comment_id'];
      newCommentContent: Tables<'comments'>['content'];
    }) => {
      return axios.patch(`/api/post/comment/${id}`, { commentId, newCommentContent });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comment'] })
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({ id, commentId }: { id: string; commentId: Tables<'comments'>['comment_id'] }) =>
      axios.delete(`/api/post/comment/${id}`, { data: { commentId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
    }
  });

  return { createCommentMutation, updateCommentMutation, deleteCommentMutation };
};

export default useCommentMutation;
