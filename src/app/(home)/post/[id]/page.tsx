import { getPostByIdInServer } from '@/app/api/post/[id]/route';
import PostContent from '@/components/PostPage/PostContent';

async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const initialData = await getPostByIdInServer(id);
  return (
    <div className="bg-black min-w-[365px] max-w-[640px] w-full min-h-screen m-auto border-x border-[#2F3336] flex flex-col items-center px-[30px]">
      <PostContent initialData={initialData} />
    </div>
  );
}

export default PostPage;
