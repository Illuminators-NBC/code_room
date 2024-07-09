'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AccountEditPage() {
  const notify = () => {
    toast.error('비밀번호를 확인해주세요.');
  };
  return (
    <div className="bg-zinc-950 w-screen h-screen">
      <div className="text-white bg-zinc-950 w-[640px] h-screen border border-zinc-800 m-auto p-[30px] text-center ">
        <Image
          src={'/logo_icon.png'}
          alt="code_room logo icon"
          width="50"
          height="50"
          className="m-auto mt-[83px] mb-[28px]"
        />
        <p className="text-xl font-bold">
          <span>🌊 </span> 헤엄치는 피즈{' '}
          <button className="ml-2">
            <Image src={'/refresh_icon.png'} alt="refresh icon" width="16" height="16" />
          </button>
        </p>
        <div>
          <form className="mt-[60px]">
            <Input
              className="w-96 h-10 bg-[#71717A] border-zinc-600 p-4 m-auto mb-7 text-black placeholder:text-white placeholder:font-nomal"
              type="email"
              placeholder="Email@email.com"
              disabled
            />
            <Input
              className="w-96 h-10 bg-[#27272A] border-zinc-600 p-4 m-auto mb-7 text-white"
              type="password"
              placeholder="password"
            />
            <Input
              className="w-96 h-10 bg-[#27272A] border-zinc-600 p-4 m-auto mb-7 text-white"
              type="password"
              placeholder="confirm password"
            />
            <Button
              className="w-96 h-10 mt-8 bg-[#DD268E] border-0 font-bold hover:bg-[#FB2EA2] hover:text-white"
              variant="outline"
              type="submit"
              onClick={notify}
            >
              수 정
            </Button>
            <Link href={'/user/1'}>
              <Button
                className="w-96 h-10 mt-5 bg-[#27272A] border-0 font-bold hover:bg-[#2d2d30] hover:text-white"
                variant="outline"
              >
                취 소
              </Button>
            </Link>
          </form>
        </div>
        <div>
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
            pauseOnHover
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
}

export default AccountEditPage;
