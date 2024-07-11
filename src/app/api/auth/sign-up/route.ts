import { createClient } from '@/supabase/server';
import { FormState } from '@/types/signUpFormType';

const RECAPTCHA_SECRET_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY as string;

const validateReCAPTCHA = async (token: string) => {
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
  });
  const data = await response.json();
  return data.success;
};

export async function POST(request: Request) {
  const supabase = createClient();
  const { email, pw, nickname, recaptchaToken } = (await request.json()) as FormState;

  const isReCAPTCHATokenValid = await validateReCAPTCHA(recaptchaToken);
  if (!isReCAPTCHATokenValid) {
    return Response.json({ errorMsg: 'Invalid reCAPTCHA' }, { status: 400 });
  }

  let { data, error } = await supabase.auth.signUp({
    email,
    password: pw,
    options: { data: { nickname } }
  });

  if (error) {
    console.log('error: ', error.message);

    return Response.json({ errorMsg: error.message }, { status: 400 });
  }

  return Response.json({ errorMsg: null });

}
