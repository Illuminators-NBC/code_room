import { createClient as createServerClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';

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

export const getCommentByIdInServer = async (id: string) => {
  const supabaseClient = createServerClient();
  const { data, error } = await supabaseClient.from('comments').select('*').eq('post_id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

export const createCommentInServer = async (newComment: Tables<'comments'>) => {
  const supabaseClient = createServerClient();

  const { error } = await supabaseClient.from('comments').insert(newComment);

  if (error) {
    throw new Error(error.message);
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

export const deleteCommentInServer = async (commentId: Tables<'comments'>['comment_id']) => {
  const supabaseClient = createServerClient();

  const { error } = await supabaseClient.from('comments').delete().eq('comment_id', commentId);

  if (error) {
    throw new Error(error.message);
  }
};
