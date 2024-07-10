import { createClient as createServerClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const getCommentByIdInServer = async (id: string) => {
  const supabaseClient = createServerClient();
  const { data, error } = await supabaseClient.from('comments').select('*').eq('post_id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await getCommentByIdInServer(id);
  return NextResponse.json(res);
};
