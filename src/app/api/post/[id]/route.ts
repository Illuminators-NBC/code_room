import { getPostByIdInServer } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await getPostByIdInServer(id);
  return NextResponse.json(res);
};
