import { Comment } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useCommentMutation = () => {
  const createCommentMutation = useMutation({
    mutationFn: ({ id, newComment }: { id: string; newComment: Comment }) => {
      return axios.post(`/api/post/comment/${id}`, newComment);
    }
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({
      id,
      commentId,
      newComment
    }: {
      id: string;
      commentId: Comment['comment_id'];
      newComment: Comment['content'];
    }) => {
      return axios.patch(`/api/post/comment/${id}`, { commentId, newComment });
    }
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({ id, commentId }: { id: string; commentId: Comment['comment_id'] }) =>
      axios.delete(`/api/post/comment/${id}`, { data: { commentId } })
  });

  return { createCommentMutation, updateCommentMutation, deleteCommentMutation };
};

export default useCommentMutation;
