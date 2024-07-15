'use client';

import { createClient } from '@/supabase/client';
import { postProps } from '@/types/posts';
import { Tables } from '@/types/supabase';
import { useEffect, useState } from 'react';

export default function UserNickname({ post_id }: postProps) {
  const supabase = createClient();

  const [nickname, setNickname] = useState<Tables<'user'>['nickname']>('');

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const { data: postData, error: postError } = await supabase
          .from('post')
          .select('user_id')
          .eq('post_id', post_id)
          .single();

        if (postError || !postData) {
          console.error('Error fetching post:', postError);
          return;
        }

        const user_id = postData.user_id;

        const { data: userData, error: userError } = await supabase
          .from('user')
          .select('nickname')
          .eq('id', user_id)
          .single();

        if (userError || !userData) {
          console.error('Error fetching user:', userError);
          return;
        }

        setNickname(userData.nickname);
      } catch (error) {
        console.error('Error fetching nickname:', error);
      }
    };

    fetchNickname();
  }, [post_id]);

  return (
    <div className="mb-4">
      <span className="w-auto border border-zinc-500 leading-8 px-6 py-2 text-[15px] rounded-lg font-bold">
        {nickname}
      </span>
    </div>
  );
}
