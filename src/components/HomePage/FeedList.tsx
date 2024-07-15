'use client';

import { PaigniatedPost, Post } from '@/types/posts';
import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import CommentButton from '../common/CommentButton';
import LikeButton from '../common/LikeButton';
import { categories } from '../PostingPage/Category/CategoryMenu';
import { SkeletonCard } from './Skeleton';
import UserNickname from './UserNickname';

const fetchPost = async (pageParam: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/home?page=${pageParam}`);

    if (response.ok) {
      const posts = await response.json();

      return posts;
    }
  } catch (error) {
    throw new Error('데이터 조회에 실패했습니다.');
  }
};

export default function FeedList() {
  const {
    data: paginatedPosts,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }): Promise<PaigniatedPost> => fetchPost(pageParam),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    }
  });

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    }
  });

  if (isPending)
    return (
      <ul className="w-92 sm:w-[640px]">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </ul>
    );
  if (isError) return <div>Error...</div>;

  return (
    <>
      <ul className="w-[640px] sm:max-w-120">
        {paginatedPosts.pages.map((page) => {
          return page.data.map((post: Post) => {
            const isLastItem = page.data.length - 1 === page.data.indexOf(post);

            const category = post.tag && categories.find((category) => category.name === post.tag);
            const formattedDate = dayjs(post.updated_at ? post.updated_at : post.created_at).format(
              'h:mm A · MMM D, YYYY'
            );

            return (
              <li
                ref={isLastItem ? ref : null}
                key={post.post_id}
                className="w-92 sm:w-120 border border-[#2F3336] p-3.5 sm:p-7"
              >
                <Link className="pointer" href={`/post/${post.post_id}`}>
                  <UserNickname post_id={post.post_id} />
                  <figure className="relative max-w-92 sm:max-w-120 h-32 sm:h-[300px]">
                    <Image
                      priority={true}
                      src={post.image ? post.image : '/no-image.png'}
                      className="rounded-xl"
                      alt="유저가 업로드한 사진"
                      fill={true}
                      sizes={'100vw'}
                    />
                  </figure>

                  <p className="mt-5 mb-7">{post.content}</p>
                </Link>
                <div className="flex mb-7">
                  <span className="mr-2">{formattedDate}</span>
                  <LikeButton post_id={post.post_id} /> <span className="mx-2">{post.like}</span>
                  <Link className="flex pointer" href={`/post/${post.post_id}`}>
                    <CommentButton /> <span className="mx-2">{post.comment_count}</span>
                  </Link>
                  {category && (
                    <span
                      className={`ml-auto px-2 py-1 rounded-full text-sm flex items-center ${category.backgroundColor} ${category.color}`}
                    >
                      {post.tag}
                    </span>
                  )}
                </div>
              </li>
            );
          });
        })}
        {isFetchingNextPage && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </ul>
    </>
  );
}
