'use client';
import Header from '@/components/common/Header';
import PostingPage from '@/components/PostingPage';
import useUserInfo from '@/hooks/useUserInfo';

function PostPage() {
  return (
    <div>
      <Header />
      <PostingPage />
    </div>
  );
}

export default PostPage;
