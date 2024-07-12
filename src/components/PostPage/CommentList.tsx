'use client';

import { useCommentQuery } from '@/hooks';
import { Tables } from '@/types/supabase';
import { useParams } from 'next/navigation';
import CommentItem from './CommentItem';

interface CommentListProps {
  initialCommentData: Tables<'comments'>[];
}

function CommentList({ initialCommentData }: CommentListProps) {
  const { id } = useParams<{ id: string }>();
  const { data: commentList } = useCommentQuery(id, initialCommentData);

  return (
    <ul className="text-white flex flex-col w-full">
      {commentList.map((comment) => (
        <CommentItem key={comment.comment_id} comment={comment} />
      ))}
    </ul>
  );
}

export default CommentList;
