import FeedList from '@/components/HomePage/FeedList';

function HomePage() {
  return (
    <main className="text-white bg-zinc-950 mx-auto max-w-92 p-3.5 sm:max-w-screen-sm sm:p-7 h-screen">
      <section>
        <input type="text" placeholder="아이디어를 공유해보세요!" disabled />
      </section>
      <section className="w-full">
        {/* tanstack query 의 prefetchQuery 를 사용하면 SEO 최적화에 도움이 됨*/}
        <FeedList />
      </section>
    </main>
  );
}

export default HomePage;
