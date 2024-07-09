import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const getPostById = async (id: string) => {
  const supabaseClient = createClient();
  const { data, error } = await supabaseClient.from('post').select('*').eq('post_id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await getPostById(id);
  return NextResponse.json(res);
};
