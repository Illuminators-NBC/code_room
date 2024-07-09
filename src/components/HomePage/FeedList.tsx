'use client';

import { useQuery } from '@tanstack/react-query';
import FeedItem from './FeedItem';
import { Post } from '@/types/posts';

const fetchPost = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/home');

    if (response.ok) {
      const posts: Promise<Post[]> = await response.json();

      return posts;
    }
  } catch (error) {
    throw new Error('데이터 조회에 실패했습니다.');
  }
};

export default function FeedList() {
  const {
    data: posts,
    isPending,
    isError
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPost
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!posts) return null;

  return (
    <ul>
      {posts.map((post: Post) => (
        <li key={post.post_id}>
          <FeedItem post={post} />
        </li>
      ))}
    </ul>
  );
}
