type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Post = {
  comment_count: number;
  content: string;
  created_at: string;
  image: string | null;
  like: number;
  nickname: string;
  post_id: string;
  tag: string | null;
  updated_at: string | null;
  user_id: string;
};

export interface PostProps {
  post: Post;
}

export type PaigniatedPost = {
  data: Post[];
  totalPages: number;
  hasNextPage: boolean;
};

export type idProps = {
  user_id: string;
  post_id: string;
  email: string;
};

export type postProps = {
  post_id: string;
};
