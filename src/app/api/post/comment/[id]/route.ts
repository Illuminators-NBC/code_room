import {
  createCommentInServer,
  deleteCommentInServer,
  getCommentByIdInServer,
  updateCommentInServer
} from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const res = await getCommentByIdInServer(id);

  return NextResponse.json(res);
};

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const newComment = await request.json();

  await createCommentInServer(id, newComment);

  return NextResponse.json('Comment Create Success!');
};

export const PATCH = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { commentId, newComment } = await request.json();

  await updateCommentInServer(id, commentId, newComment);

  return NextResponse.json('Comment Update Success!');
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { commentId } = await request.json();

  await deleteCommentInServer(id, commentId);

  return NextResponse.json('Comment Delete Success!');
};
