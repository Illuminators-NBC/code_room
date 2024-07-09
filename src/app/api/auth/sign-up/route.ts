import { createClient } from '@/supabase/client';
import { StringToBoolean } from 'class-variance-authority/types';

export type FormState = {
  email: string;
  pw: string;
  nickname: string;
};

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, pw, nickname } = (await request.json()) as FormState;

  let { data, error } = await supabase.auth.signUp({
    email,
    password: pw,
    options: { data: { nickname } }
  });

  if (error) {
    console.log('error: ', error.message);
  }

  return Response.json({ errorMsg: error?.message || null });
}
