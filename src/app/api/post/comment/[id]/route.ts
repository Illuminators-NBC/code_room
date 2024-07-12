import {
  createCommentInServer,
  deleteCommentInServer,
  getCommentByIdInServer,
  updateCommentInServer
} from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id: postId } = params;

  const res = await getCommentByIdInServer(postId);

  return NextResponse.json(res);
};

export const POST = async (request: NextRequest) => {
  const newComment = await request.json();

  await createCommentInServer(newComment);

  return NextResponse.json('Comment Create Success!');
};

export const PATCH = async (request: NextRequest) => {
  const { commentId, newCommentContent } = await request.json();

  await updateCommentInServer(commentId, newCommentContent);

  return NextResponse.json('Comment Update Success!');
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const { commentId } = await request.json();

  await deleteCommentInServer(id, commentId);

  return NextResponse.json('Comment Delete Success!');
};
