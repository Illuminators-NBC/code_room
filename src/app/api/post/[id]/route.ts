import { deletePostByIdInServer, getPostByIdInServer, updatePostByIdInServer } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await getPostByIdInServer(id);
  return NextResponse.json(res);
};

export const PATCH = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const newPost = await request.json();

  await updatePostByIdInServer(id, newPost);

  return NextResponse.json('Post Update Success!');
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  await deletePostByIdInServer(id);

  return NextResponse.json('Post Delete Success!');
};
