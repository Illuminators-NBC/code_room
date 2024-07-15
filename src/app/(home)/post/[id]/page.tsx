import Header from '@/components/common/Header';
import CommentForm from '@/components/PostPage/CommentForm';
import CommentList from '@/components/PostPage/CommentList';
import PostContent from '@/components/PostPage/PostContent';
import { getCommentByIdInServer, getPostByIdInServer } from '@/utils/api';

async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const initialPostData = await getPostByIdInServer(id);
  const initialCommentData = await getCommentByIdInServer(id);

  return (
    <>
      <Header />
      <div className="bg-black min-w-[365px] max-w-[640px] w-full min-h-screen m-auto border-x border-[#2F3336] flex flex-col items-center px-[30px]">
        <PostContent initialPostData={initialPostData[0]} />
        <CommentList initialCommentData={initialCommentData} />
        <CommentForm />
      </div>
    </>
  );
}

export default PostPage;
