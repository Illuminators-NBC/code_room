type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Post = {
  comment: Json | null;
  content: string | null;
  created_at: string;
  image: string | null;
  like: number | null;
  nickname: string | null;
  post_id: string;
  tag: Json | null;
  updated_at: string | null;
  user_id: string | null;
};

export interface PostProps {
  post: Post;
}
