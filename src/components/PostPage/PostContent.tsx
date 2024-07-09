'use client';

import { usePostQuery } from '@/hooks';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface PostContentProps {
  initialData: any[];
}

function PostContent({ initialData }: PostContentProps) {
  const { id } = useParams<{ id: string }>();
  const { data: post } = usePostQuery(id, initialData);
  const { nickname, image, content, created_at, like, comment, tag } = post[0];

  return (
    <div className="w-full py-[30px] text-white">
      <div className="flex justify-between items-center mb-5 font-medium">
        <p>{nickname}</p>
        <button className="text-[#676B70]">...</button>
      </div>
      <div className="relative aspect-video mb-5 rounded-[10px] overflow-hidden">
        <Image src={image} fill alt="" className="object-cover bg-red-400" />
      </div>
      <p className="break-words mb-[30px]">{content}</p>
      <hr className="border-[#2F3336]" />
      <div className="flex justify-between items-center py-[33px]">
        <div className="flex items-center gap-[18px]">
          <p>{new Date(created_at).toLocaleString()}</p>
          <div className="flex items-center gap-1">
            <Image src="/heart.svg" width={22} height={22} alt="heart" />
            <p>{like}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/message-square.svg" width={22} height={22} alt="message-square" />
            <p>{comment ? comment.length : 0}</p>
          </div>
        </div>
        <p>{tag.tag}</p>
      </div>
    </div>
  );
}

export default PostContent;
