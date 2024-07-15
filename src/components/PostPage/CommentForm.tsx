'use client';

import useCommentMutation from '@/hooks/useCommentMutation';
import useUserInfo from '@/hooks/useUserInfo';
import { Tables } from '@/types/supabase';
import { useParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

function CommentForm() {
  const { id } = useParams<{ id: string }>();
  const { createCommentMutation } = useCommentMutation();

  const { userInfo } = useUserInfo();

  const [content, setContent] = useState<string>('');

  const handleCreateComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment: Pick<Tables<'comments'>, 'post_id' | 'content' | 'user_id'> = {
      user_id: userInfo.id,
      post_id: id,
      content
    };

    createCommentMutation.mutate({ id, newComment });

    setContent('');
  };

  return (
    <form
      onSubmit={handleCreateComment}
      className="text-white flex items-center justify-between w-full gap-[28px] py-8"
    >
      <input
        className="font-medium text-sm px-4 h-10 rounded-[6px] bg-[#27272A] outline-none w-full placeholder:text-[#71717A]"
        placeholder="댓글을 작성하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="font-medium text-sm px-4 h-10 rounded-[6px] bg-[#27272A] hover:bg-[#DD268E] transition">
        Post
      </button>
    </form>
  );
}

export default CommentForm;
