'use client';

import { usePostQuery } from '@/hooks';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface PostContentProps {
  initialPostData: Tables<'post'>;
}

function PostContent({ initialPostData }: PostContentProps) {
  const { id } = useParams<{ id: string }>();
  const { data: post } = usePostQuery(id, initialPostData);
  const { nickname, image, content, created_at, like, comment, tag, updated_at } = post;

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
          <p>{updated_at ? updated_at : created_at}</p>
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
