'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Post, PaigniatedPost } from '@/types/posts';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { SkeletonCard } from './Skeleton';
import LikeButton from '../common/LikeButton';
import CommentButton from '../common/CommentButton';

const fetchPost = async (pageParam: number) => {
  try {
    // HTTP 요청에 대한 정보를 담고 있음, status code, header, body 등
    // SEO 최적화를 위해 client-side 가 아니라 서버 환경에서 진행할 경우, route.ts 코드를 직접 실행할 수 있게 만드는 방법이 있음
    const response = await fetch(`http://localhost:3000/api/home?page=${pageParam}`);

    if (response.ok) {
      // response.json()은 body를 JSON으로 파싱하는 메소드
      const posts = await response.json();

      console.log(posts);
      return posts;
    }
  } catch (error) {
    throw new Error('데이터 조회에 실패했습니다.');
  }
};

// 메인페이지에서 게시글 목록을 보여주기 위한 컴포넌트
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
            return (
              // react-intersection-observer 에서 제공하는 ref 를 사용하기 위해 한 컴포넌트 안에서 ref를 사용하도록 설정.
              // forwardRef 를 사용하면 동작 안 함
              <li
                ref={isLastItem ? ref : null}
                key={post.post_id}
                className="w-92 sm:w-120 border border-[#2F3336] p-3.5 sm:p-7"
              >
                {/* <h6 className="mb-5">{nickname}</h6> */}
                {post.image ? (
                  <figure className="relative max-w-92 sm:max-w-120 h-32 sm:h-64">
                    {post.image ? (
                      <Image
                        loader={({ src }) => src}
                        className="rounded-xl"
                        priority={true}
                        src={post.image}
                        alt="유저가 업로드한 사진"
                        fill={true}
                        sizes="100vw"
                      />
                    ) : null}
                  </figure>
                ) : null}
                <p className="mt-5 mb-7">{post.content}</p>
                <div className="flex mb-7">
                  <LikeButton post_id={post.post_id} /> <span className="mx-2">{post.like}</span>
                  <CommentButton /> <span className="mx-2">{post.comment_count}</span>
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
