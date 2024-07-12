'use client';

import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import { useEffect, useState } from 'react';

interface CommentItemProps {
  comment: Tables<'comments'>;
}

function CommentItem({ comment }: CommentItemProps) {
  const { comment_id, content, created_at, updated_at, like_count, user_id } = comment;

  const [nickname, setNickname] = useState<Tables<'user'>['nickname']>('');

  const supabaseClient = createClient();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabaseClient.from('user').select('*').eq('id', user_id);
      if (error) {
        throw new Error(error.message);
      }

      setNickname(data[0].nickname);
    })();
  }, [supabaseClient, user_id]);

  return (
    <div className="py-8 border-b border-[#2F3336] flex flex-col gap-5">
      <div className="flex items-center justify-between font-medium">
        <p>{nickname}</p>
        <button className="text-xl">...</button>
      </div>
      <p>{content}</p>
    </div>
  );
}

export default CommentItem;
