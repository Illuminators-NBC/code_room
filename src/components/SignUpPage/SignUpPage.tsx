'use client';

import { FormState } from '@/types/signUpFormType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function SignUpForm() {
  const router = useRouter();
  const initialState: FormState = {
    email: '',
    pw: '',
    confirmPw: '',
    nickname: ''
  };
  const [formState, setFormState] = useState<FormState>(initialState);

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
    if (!formState.email || !formState.pw || !formState.nickname) {
      return toast.error('Please enter all blanks');
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
      body: JSON.stringify(formState)
    }).then((res) => res.json());
    if (data.errorMsg) {
      toast.error(data.errorMsg);
      return;
    }
    toast.success('Success Register');
    setFormState(initialState);
    router.push('/login');
  };

  return (
    <div className="bg-black w-[640px] h-screen border-2 border-zinc-800 h-auto m-auto text-center">
      <Image src="/Group 100.png" width={400} height={50} alt="logo" className="m-auto mt-48 mb-12" />
      <form onSubmit={onSubmitHandler}>
        <section>
          <Input
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96 mb-12"
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
            className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96 mb-12"
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
            className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96 mb-12"
          />
        </section>
        <section>
          <Input
            id="nickname"
            name="nickname"
            value={formState.nickname}
            onChange={handleInputChange}
            placeholder="Nickname"
            className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96 mb-12"
          />
        </section>
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
