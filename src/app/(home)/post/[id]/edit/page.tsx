import EditPost from '@/components/PostPage/EditPost';
import { getPostByIdInServer } from '@/utils/api';

async function PostEditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const initialPostData = await getPostByIdInServer(id);
  return <EditPost initialPostData={initialPostData[0]} />;
}

export default PostEditPage;
