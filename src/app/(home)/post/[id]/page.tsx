import { createClient } from '@/supabase/server';

const getPostById = async (id: string) => {
  const supabaseClient = createClient();
  const { data } = await supabaseClient.from('post').select('*').eq('user_id', id);
  return data;
};

async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const initialData = await getPostById(id);
  return <div>PostPage</div>;
}

export default PostPage;
