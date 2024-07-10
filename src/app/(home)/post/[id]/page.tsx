import { getPostByIdInServer } from '@/app/api/post/[id]/route';
import { getCommentByIdInServer } from '@/app/api/post/comment/[id]/route';
import PostContent from '@/components/PostPage/PostContent';

async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const initialPostData = await getPostByIdInServer(id);
  const initialCommentData = await getCommentByIdInServer(id);

  return (
    <div className="bg-black min-w-[365px] max-w-[640px] w-full min-h-screen m-auto border-x border-[#2F3336] flex flex-col items-center px-[30px]">
      <PostContent initialPostData={initialPostData[0]} />
    </div>
  );
}

export default PostPage;
