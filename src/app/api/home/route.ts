import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

const PAGE_SIZE = 2;

async function getPosts(searchParams: URLSearchParams) {
  // Server component 에서 supabase client 를 이용할 경우, 매 요청마다 새로운 client 를 생성함.
  // 공식문서에서는 cookie 와 관련한 것 때문에 그렇다고 함.
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
    .range(offset, offset + PAGE_SIZE - 1);

  const totalPages = Math.ceil(count! / PAGE_SIZE);
  const hasNextPage = page < totalPages;

  if (error) console.error('error', error);
  // 서버 컴포넌트에서 데이터를 받아오는 경우, NextResponse.json() 을 이용하여 데이터를 반환함.
  return NextResponse.json({ data: posts, totalPages, hasNextPage });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const response = await getPosts(searchParams);

  return response;
}

export async function POST(request: Request) {
  const supabase = createClient();

  const { user_id, post_id } = await request.json();

  console.log('user_id', user_id);
  console.log('post_id', post_id);

  const { data: post } = await supabase.from('post').select('like').eq('post_id', post_id).single();

  console.log('count', post?.like);

  const { data, error } = await supabase
    .from('post')
    .update({ like: (post?.like || 0) + 1 })
    .eq('post_id', post_id);

  if (error) console.error('error', error);

  const { data: liked_post } = await supabase.from('user').select('liked_post').eq('user_id', user_id).single();

  console.log('liked_post', liked_post);

  const {} = await supabase
    .from('user')
    .update({ liked_post: { post_id: '1' } })
    .eq('user_id', user_id);

  console.log({ ...liked_post, post_id });

  return NextResponse.json({ data });
}

// export async function PATCH(response: NextApiResponse, request: NextApiRequest) {
//   const supabase = createClient();

//   const { data, error } = await supabase.from('post').update({ like: 0 }).eq('post_id', post_id);

//   if (error) console.error('error', error);

//   return NextResponse.json({ data });
// }
