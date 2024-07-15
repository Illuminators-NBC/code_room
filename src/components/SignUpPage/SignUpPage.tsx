'use client';

import { FormState } from '@/types/signUpFormType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseButton from '../common/CloseButton';
import NicknameSection from '../common/NicknameSection';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

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
      return toast.error('모든 빈칸을 채워주시고 reCAPTCHA를 완료해주세요.');
    }
    if (formState.pw !== formState.confirmPw) {
      return toast.error('비밀번호가 올바르지 않습니다.');
    }
    if (!validateEmail(formState.email)) {
      return toast.error('이메일 형식이 올바르지 않습니다.');
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
    toast.success('성공적으로 회원가입되었습니다.');
    setFormState(initialState);
    router.push('/login');
  };

  const onReCaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="bg-black w-[640px] h-screen border-2 border-zinc-800 m-auto text-center">
      <div className="mt-12 ml-[500px]">
        <button type="button" onClick={() => router.push('/')}>
          <CloseButton />
        </button>
      </div>
      <Image src="/Group 100.png" width={400} height={50} alt="logo" className="m-auto mt-24 mb-8" />
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
        <Button
          type="button"
          onClick={() => router.push('/login')}
          className="w-96 mb-7 bg-[#DD268E] hover:bg-[#FB2EA2]"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}
