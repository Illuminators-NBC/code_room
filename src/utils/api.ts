import { createClient as createServerClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';

export const getPostByIdInServer = async (id: string) => {
  const supabaseClient = createServerClient();
  const { data, error } = await supabaseClient.from('post').select('*').eq('post_id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updatePostByIdInServer = async (
  id: string,
  newPost: Pick<Tables<'post'>, 'content'> & Pick<Partial<Tables<'post'>>, 'image' | 'tag'>
) => {
  const supabaseClient = createServerClient();
  const { error } = await supabaseClient
    .from('post')
    .update({ content: newPost.content, image: newPost.image, tag: newPost.tag })
    .eq('post_id', id);

  if (error) {
    throw new Error(error.message);
  }
};

export const deletePostByIdInServer = async (id: string) => {
  const supabaseClient = createServerClient();
  const { error } = await supabaseClient.from('post').delete().eq('post_id', id);

  if (error) {
    throw new Error(error.message);
  }
};

export const getCommentByIdInServer = async (postId: string) => {
  const supabaseClient = createServerClient();
  const { data, error } = await supabaseClient.from('comments').select('*').eq('post_id', postId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createCommentInServer = async (newComment: Tables<'comments'>) => {
  const prevPost = await getPostByIdInServer(newComment.post_id);
  const supabaseClient = createServerClient();

  const { error: commentError } = await supabaseClient.from('comments').insert(newComment);

  if (commentError) {
    throw new Error(commentError.message);
  }

  const { error: commentCountError } = await supabaseClient
    .from('post')
    .update({ comment_count: prevPost[0].comment_count + 1 })
    .eq('post_id', newComment.post_id);

  if (commentCountError) {
    throw new Error(commentCountError.message);
  }
};

export const updateCommentInServer = async (
  commentId: Tables<'comments'>['comment_id'],
  newCommentContent: Tables<'comments'>['content']
) => {
  const supabaseClient = createServerClient();

  const { error } = await supabaseClient
    .from('comments')
    .update({ content: newCommentContent })
    .eq('comment_id', commentId);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteCommentInServer = async (
  postId: Tables<'post'>['post_id'],
  commentId: Tables<'comments'>['comment_id']
) => {
  const prevPost = await getPostByIdInServer(postId);
  const supabaseClient = createServerClient();

  const { error: commentError } = await supabaseClient.from('comments').delete().eq('comment_id', commentId);

  if (commentError) {
    throw new Error(commentError.message);
  }

  const { error: commentCountError } = await supabaseClient
    .from('post')
    .update({ comment_count: prevPost[0].comment_count - 1 })
    .eq('post_id', postId);

  if (commentCountError) {
    throw new Error(commentCountError.message);
  }
};
