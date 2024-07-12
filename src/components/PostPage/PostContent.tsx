'use client';

import { usePostQuery } from '@/hooks';
import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PostContentProps {
  initialPostData: Tables<'post'>;
}

function PostContent({ initialPostData }: PostContentProps) {
  const { id } = useParams<{ id: string }>();
  const { data: post } = usePostQuery(id, initialPostData);
  const { user_id, image, content, created_at, like, tag, updated_at } = post;
  const formattedDate = dayjs(updated_at ? updated_at : created_at).format('h:mm A · MMM D, YYYY');

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
    <div className="w-full pt-[30px] text-white">
      <div className="min-h-[300px]">
        <div className="flex justify-between items-center mb-5 font-medium">
          <p>{nickname}</p>
          <button className="text-[#676B70]">...</button>
        </div>
        {image && (
          <div className="relative aspect-video mb-5 rounded-[10px] overflow-hidden">
            <Image src={image} fill alt="" className="object-cover" />
          </div>
        )}
        <p className="break-words mb-[30px]">{content}</p>
      </div>

      <div className="flex justify-between items-center py-[33px] border-[#2F3336] border-y">
        <div className="flex items-center gap-[18px]">
          <p>{formattedDate}</p>
          <div className="flex items-center gap-1">
            <Image src="/heart.svg" width={22} height={22} alt="heart" />
            <p>{like ? like : 0}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/message-square.svg" width={22} height={22} alt="message-square" />
            <p>0</p>
          </div>
        </div>
        {tag && <p>{tag}</p>}
      </div>
    </div>
  );
}

export default PostContent;
