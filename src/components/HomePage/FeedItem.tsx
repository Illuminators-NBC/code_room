import { PostProps } from '@/types/posts';
import React from 'react';

export default function FeedItem({ post }: PostProps) {
  return <div>{post.content}</div>;
}
