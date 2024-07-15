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
          <FeedList />
        </section>
      </main>
    </>
  );
}

export default HomePage;
