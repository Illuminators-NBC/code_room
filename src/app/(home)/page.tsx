'use client';
import AuthObserver from '@/components/common/AuthObserver';
import LogoutButton from '@/components/LoginPage/LogoutButton';
import useUserInfo from '@/hooks/useUserInfo';

import FeedList from '@/components/HomePage/FeedList';
import PostBox from '@/components/HomePage/PostBox';

function HomePage() {
  const { userInfo } = useUserInfo();
  return (
    <>
      <LogoutButton />
      <header></header>
      <main className="text-white mx-auto max-w-92 p-3.5 sm:max-w-screen-sm sm:p-7">
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
