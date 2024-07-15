'use client';

import { useLoginContext } from '@/context/LoginProvider';
import useUserInfo from '@/hooks/useUserInfo';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseButton from '../common/CloseButton';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useLoginContext();
  const [formState, setFormState] = useState({ email: '', pw: '' });
  const { setUserInfo } = useUserInfo();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!formState.email || !formState.pw) {
      return toast.error('이메일과 비밀번호를 입력해주세요.');
    }
    if (!validateEmail(formState.email)) {
      return toast.error('올바른 이메일을 입력해주세요.');
    }
    if (formState.pw.length < 6) {
      return toast.error('비밀번호는 최소 6글자 이상이여야합니다.');
    }
    const data = await fetch('/api/auth/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    }).then((res) => res.json());
    if (data.errorMsg) {
      toast.error(data.errorMsg);
      return;
    }
    toast.success('성공적으로 로그인되었습니다.');
    login();
    setUserInfo({ id: data.id, nickname: data.nickname, email: data.email });
    setFormState({ email: '', pw: '' });
    router.replace('/');
  };

  return (
    <div className="bg-zinc-950 w-[640px] h-screen border-2 border-zinc-800 m-auto text-center">
      <div className="mt-12 ml-[500px]">
        <button type="button" onClick={() => router.push('/')}>
          <CloseButton />
        </button>
      </div>
      <Image src="/Group 100.png" width={400} height={50} alt="logo" className="m-auto mt-24" />
      <form onSubmit={onSubmitHandler}>
        <section>
          <Input
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96 mb-12 mt-24"
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
            className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96"
          />
        </section>
        <Button type="submit" className="w-96 mb-7 mt-24 bg-[#DD268E] hover:bg-[#FB2EA2]">
          Log In
        </Button>
        <br />
        <Button type="button" onClick={() => router.push('/sign-up')} className="w-96 bg-[#DD268E] hover:bg-[#FB2EA2]">
          Register
        </Button>
      </form>
    </div>
  );
}
