import { createClient } from '@/supabase/server';
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
    return new Response(JSON.stringify({ errorMsg: error.message }), { status: 400 });
  }

  const { user } = data;
  if (user) {
    const { data: userProfile, error: profileError } = await supabase
      .from('user')
      .select('id, nickname, email')
      .eq('id', user.id)
      .single();
    if (profileError) {
      console.error('profileError:', profileError.message);
      return new Response(JSON.stringify({ errorMsg: profileError.message }), { status: 400 });
    }
    return new Response(
      JSON.stringify({ id: userProfile.id, nickname: userProfile.nickname, email: userProfile.email, errorMsg: null }),
      {
        status: 200
      }
    );
  }
}
