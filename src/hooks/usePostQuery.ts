import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const getPostByIdInClient = async (id: string) => {
  const supabaseClient = createClient();
  const { data, error } = await supabaseClient.from('post').select('*').eq('post_id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const usePostQuery = (id: string, initialData?: Tables<'post'>[]) => {
  const result = useQuery({
    queryKey: ['post', id],
    queryFn: async () => await getPostByIdInClient(id),
    initialData: initialData ? initialData : []
  });

  return result;
};

export default usePostQuery;
