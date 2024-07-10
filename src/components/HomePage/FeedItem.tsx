import { PostProps } from '@/types/posts';
import Image from 'next/image';
import React from 'react';

export default function FeedItem({ post }: PostProps) {
  return (
    <li className="max-w-92 sm:max-w-120">
      <h6>닉: {post.nickname}</h6>
      {post.image ? (
        <figure className="relative max-w-92 sm:max-w-120 h-32 sm:h-64">
          사진: <Image priority={true} src={post.image} alt="유저가 업로드한 사진" fill={true} sizes="100vw" />
        </figure>
      ) : null}
      <p>내용: {post.content}</p>
    </li>
  );
}
