import { getPostById } from '@/app/api/post/[id]/route';

async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const initialData = await getPostById(id);
  return <div>PostPage</div>;
}

export default PostPage;
