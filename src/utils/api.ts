import { createClient as createServerClient } from '@/supabase/server';

// Post
export const getPostByIdInServer = async (id: string) => {
  const supabaseClient = createServerClient();
  const { data, error } = await supabaseClient.from('post').select('*').eq('post_id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Comment
export interface Comment {
  comment_id: string;
  content: string;
  user_id: string;
  nickname: string;
  created_at?: string;
  updated_at?: string;
}

export const getCommentByIdInServer = async (id: string) => {
  const supabaseClient = createServerClient();
  const { data, error } = await supabaseClient.from('comments').select('*').eq('post_id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

export const createCommentInServer = async (postId: string, newComment: Comment) => {
  const { comment_count: prevCommentCount, comment_list: prevCommentList = [] } = await getCommentByIdInServer(postId);

  const formattedPrevCommentList = prevCommentList!.map((comment) => JSON.parse(comment as string));

  const newCommentList = [...formattedPrevCommentList, newComment];
  const formattedNewCommentList = newCommentList.map((comment) => JSON.stringify(comment));

  const supabaseClient = createServerClient();

  const { error } = await supabaseClient
    .from('comments')
    .update({ comment_list: formattedNewCommentList, comment_count: prevCommentCount + 1 })
    .eq('post_id', postId);

  if (error) {
    throw new Error(error.message);
  }
};

export const updateCommentInServer = async (
  postId: string,
  commentId: Comment['comment_id'],
  newComment: Comment['content']
) => {
  const { comment_list: prevCommentList = [] } = await getCommentByIdInServer(postId);

  const formattedPrevCommentList: Comment[] = prevCommentList!.map((comment) => JSON.parse(comment as string));

  const newCommentList = formattedPrevCommentList.map((comment) =>
    comment.comment_id === commentId ? { ...comment, content: newComment } : comment
  );
  const formattedNewCommentList = newCommentList.map((comment) => JSON.stringify(comment));

  const supabaseClient = createServerClient();

  const { error } = await supabaseClient
    .from('comments')
    .update({ comment_list: formattedNewCommentList })
    .eq('post_id', postId);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteCommentInServer = async (postId: string, commentId: Comment['comment_id']) => {
  const { comment_count: prevCommentCount, comment_list: prevCommentList = [] } = await getCommentByIdInServer(postId);

  const formattedPrevCommentList: Comment[] = prevCommentList!.map((comment) => JSON.parse(comment as string));

  const newCommentList = formattedPrevCommentList.filter((comment) => comment.comment_id !== commentId);
  const formattedNewCommentList = newCommentList.map((comment) => JSON.stringify(comment));

  const supabaseClient = createServerClient();

  const { error } = await supabaseClient
    .from('comments')
    .update({ comment_list: formattedNewCommentList, comment_count: prevCommentCount - 1 })
    .eq('post_id', postId);

  if (error) {
    throw new Error(error.message);
  }
};
