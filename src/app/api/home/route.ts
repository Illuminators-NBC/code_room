import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

const PAGE_SIZE = 2;

async function getPosts(searchParams: URLSearchParams) {
  const supabase = createClient();

  const page = parseInt(searchParams.get('page') || '1');

  const offset = (page - 1) * PAGE_SIZE;

  const {
    data: posts,
    count,
    error
  } = await supabase
    .from('post')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  const totalPages = Math.ceil(count! / PAGE_SIZE);
  const hasNextPage = page < totalPages;

  if (error) console.error('error', error);

  return NextResponse.json({ data: posts, totalPages, hasNextPage });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const response = await getPosts(searchParams);

  return response;
}

export async function POST(request: Request) {
  const supabase = createClient();

  const { email, post_id } = await request.json();

  const { data: post } = await supabase.from('post').select('like').eq('post_id', post_id).single();

  const { data, error } = await supabase
    .from('post')
    .update({ like: (post?.like || 0) + 1 })
    .eq('post_id', post_id);

  if (error) console.error('error', error);

  const { data: liked, error: userError } = await supabase
    .from('user')
    .select('liked_post')
    .eq('email', email)
    .single();

  const likedPosts = liked?.liked_post ? liked.liked_post : [];

  const {} = await supabase
    .from('user')
    .update({ liked_post: [...likedPosts!, post_id] })
    .eq('email', email);

  return NextResponse.json({ data });
}
