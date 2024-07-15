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
      <PostContent initialPostData={initialPostData[0]} />
      <CommentList initialCommentData={initialCommentData} />
      <CommentForm />
    </>
  );
}

export default PostPage;
