import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';

const getPostByIdInClient = async (id: string) => {
  const supabaseClient = createClient();
  const { data, error } = await supabaseClient.from('test_post').select('*').eq('post_id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const usePostQuery = (id: string, initialData?: any[]) => {
  const result = useQuery({
    queryKey: ['post', id],
    queryFn: async () => await getPostByIdInClient(id),
    initialData: initialData ? initialData : []
  });

  return { ...result };
};

export default usePostQuery;
