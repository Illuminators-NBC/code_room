'use client';

import { FormState } from '@/types/signUpFormType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ReCAPTCHA from 'react-google-recaptcha';
import NicknameSection from '../common/NicknameSection';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

export default function SignUpForm() {
  const router = useRouter();
  const initialState: FormState = {
    email: '',
    pw: '',
    confirmPw: '',
    nickname: '',
    recaptchaToken: ''
  };
  const [formState, setFormState] = useState<FormState>(initialState);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleNicknameChange = (nickname: string) => {
    setFormState((prev) => ({ ...prev, nickname }));
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!formState.email || !formState.pw || !formState.nickname || !recaptchaToken) {
      return toast.error('Please enter all fields and verify reCAPTCHA');
    }
    if (formState.pw !== formState.confirmPw) {
      return toast.error('Passwords do not match');
    }
    if (!validateEmail(formState.email)) {
      return toast.error('Invalid Email Format');
    }
    const data = await fetch('api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ ...formState, recaptchaToken })
    }).then((res) => res.json());
    if (data.errorMsg) {
      toast.error(data.errorMsg);
      return;
    }
    toast.success('Success Register');
    setFormState(initialState);
    router.push('/login');
  };

  const onReCaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="bg-zinc-950 w-[640px] h-screen border-2 border-zinc-800 h-auto m-auto text-center">
      <Image src="/Group 100.png" width={400} height={50} alt="logo" className="m-auto mt-48 mb-12" />
      <form onSubmit={onSubmitHandler}>
        <section>
          <Input
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96 mb-7"
          />
        </section>
        <section>
          <Input
            id="pw"
            name="pw"
            type="password"
            value={formState.pw}
            onChange={handleInputChange}
            placeholder="Password"
            className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96 mb-7"
          />
        </section>
        <section>
          <Input
            id="confirmPw"
            name="confirmPw"
            type="password"
            value={formState.confirmPw}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96 mb-7"
          />
        </section>
        <NicknameSection nickname={formState.nickname} onNicknameChange={handleNicknameChange} />
        <ReCAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={onReCaptchaChange}
          className="inline-flex items-center justify-center mb-7"
        />
        <Button type="submit" className="w-96 mb-7 bg-[#DD268E] hover:bg-[#FB2EA2]">
          Register
        </Button>
        <Button type="button" onClick={() => router.push('/login')} className="w-96 bg-[#DD268E] hover:bg-[#FB2EA2]">
          Log In
        </Button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </div>
  );
}
