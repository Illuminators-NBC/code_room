import { createClient } from '@/supabase/client';
import { FormState } from '@/types/signUpFormType';

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, pw } = (await request.json()) as Omit<FormState, 'nickname'>;

  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pw
  });

  if (error) {
    console.log('error: ', error.message);
  }

  return Response.json({ errorMsg: error?.message });
}
