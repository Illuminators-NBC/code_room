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
