import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

async function getPosts() {
  // Server component 에서 supabase client 를 이용할 경우, 매 요청마다 새로운 client 를 생성함.
  // 공식문서에서는 cookie 와 관련한 것 때문에 그렇다고 함.
  const supabase = createClient();
  try {
    const { data: posts } = await supabase.from('post').select('*');

    // 서버 컴포넌트에서 데이터를 받아오는 경우, NextResponse.json() 을 이용하여 데이터를 반환함.
    return NextResponse.json(posts);
  } catch (error) {
    throw new Error('데이터 조회에 실패했습니다.');
  }
}

export async function GET() {
  const posts = await getPosts();

  return posts;
}
