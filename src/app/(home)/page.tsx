'use client';
import Header from '@/components/common/Header';
import FeedList from '@/components/HomePage/FeedList';
import PostBox from '@/components/HomePage/PostBox';

function HomePage() {
  return (
    <>
      <Header />
      <main className="text-white mx-auto max-w-92 sm:max-w-screen-sm">
        <PostBox />
        <section className="w-full">
          {/* tanstack query 의 prefetchQuery 를 사용하면 SEO 최적화에 도움이 됨*/}
          <FeedList />
        </section>
      </main>
    </>
  );
}

export default HomePage;
