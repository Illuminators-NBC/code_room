import { getPostByIdInServer } from '@/app/api/post/[id]/route';

async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const initialData = await getPostByIdInServer(id);
  return <div>PostPage</div>;
}

export default PostPage;
