import FeedList from '@/components/HomePage/FeedList';

function HomePage() {
  return (
    <main className="text-white bg-zinc-950 mx-auto max-w-92 sm:max-w-screen-sm h-screen">
      <section>
        <input type="text" placeholder="아이디어를 공유해보세요!" disabled />
      </section>
      <section>
        <FeedList />
      </section>
    </main>
  );
}

export default HomePage;
