'use client';

import { useCommentQuery } from '@/hooks';
import { Tables } from '@/types/supabase';
import { Comment } from '@/utils/api';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

interface CommentListProps {
  initialCommentData: Tables<'comments'>;
}

function CommentList({ initialCommentData }: CommentListProps) {
  const { id } = useParams<{ id: string }>();
  const { data: comment } = useCommentQuery(id, initialCommentData);

  const formattedCommentList = useMemo(
    () => (comment.comment_list ? comment.comment_list.map((comment) => JSON.parse(comment as string)) : []),
    [comment.comment_list]
  );

  return (
    <ul className="text-white flex flex-col w-full">
      {formattedCommentList.map((comment: Comment) => (
        <li key={comment.comment_id}>
          <div className="py-8 border-b flex flex-col gap-5">
            <div className="flex items-center justify-between font-medium">
              <p>{comment.nickname}</p>
              <button className="text-xl">...</button>
            </div>
            <p>{comment.content}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
