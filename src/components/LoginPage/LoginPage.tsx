'use client';

import { useLoginContext } from '@/context/LoginProvider';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useLoginContext();
  const [formState, setFormState] = useState({ email: '', pw: '' });

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
      return toast.error('Please Enter Email and Password');
    }
    if (!validateEmail(formState.email)) {
      return toast.error('Invalid Email Format');
    }
    if (formState.pw.length < 6) {
      return toast.error('Password must be at least 6 characters long');
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
    toast.success('Success Login');
    login();
    setFormState({ email: '', pw: '' });
    router.replace('/');
  };

  return (
    <div className="bg-black w-[640px] h-screen border-2 border-zinc-800 h-auto m-auto text-center">
      <Image src="/Group 100.png" width={400} height={50} alt="logo" className="m-auto mt-48 mb-[28px]" />
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
            className="bg-[#27272A] text-white border-[#71717A] inline-flex items-center justify-center w-96 mb-24"
          />
        </section>
        <Button type="submit" className="w-96 mb-7 bg-[#DD268E] hover:bg-[#FB2EA2]">
          Log In
        </Button>
        <br />
        <Button type="button" onClick={() => router.push('/sign-up')} className="w-96 bg-[#DD268E] hover:bg-[#FB2EA2]">
          Register
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
