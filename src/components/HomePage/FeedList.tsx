'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import FeedItem from './FeedItem';
import { Post, PaigniatedPost } from '@/types/posts';

const fetchPost = async (pageParam: number) => {
  try {
    // 얘는 HTTP 요청에 대한 정보를 담고 있음, status code, header, body 등
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

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <>
      <ul className="max-w-92 sm:max-w-120">
        {paginatedPosts.pages.map((page) => {
          return page.data.map((post: Post) => {
            return <FeedItem key={post.post_id} post={post} />;
          });
        })}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </>
  );
}
