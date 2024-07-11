'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClient } from '@/supabase/client';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

type ChangePasswordFormProps = {
  onSubmit: (newPassword: string) => void;
};

const AccountEditPage: React.FC<ChangePasswordFormProps> = ({ onSubmit }) => {
  const supabase = createClient();
  const [userEmail, setUserEmail] = useState('');
  const [userNickname, setUserNickName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewPassword(e.target.value);

    const { data: user, error } = await supabase.auth.updateUser({ password: newPassword });
    console.log(error);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (user) {
          const { data, error } = await supabase.from('user').select('email, nickname').eq('id', user.id).single();
          if (error) throw error;
          if (data) {
            setUserEmail(data.email ?? '');
            setUserNickName(data.nickname ?? '');
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

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
          <span>{userNickname}</span>
          <button className="ml-2 hover:transition-all hover:duration-500 hover:rotate-180 items-center">
            <Image src={'/refresh_icon.png'} alt="refresh icon" width="18" height="18" />
          </button>
        </p>
        <div>
          <form
            className="mt-[60px]"
            onSubmit={(e) => {
              confirmPassword === newPassword ? handleSubmit(e) : toast.error('비밀번호를 확인해주세요');
            }}
          >
            <Input
              className="w-96 h-10 bg-[#71717A] border-zinc-600 p-4 m-auto mb-7 text-white placeholder:text-white placeholder:font-nomal"
              type="email"
              value={userEmail}
              disabled
            />
            <Input
              className="w-96 h-10 bg-[#27272A] border-zinc-600 p-4 m-auto mb-7 text-white"
              type="password"
              placeholder="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              className="w-96 h-10 bg-[#27272A] border-zinc-600 p-4 m-auto mb-7 text-white"
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
            <Button
              className="w-96 h-10 mt-8 bg-[#DD268E] border-0 font-bold hover:bg-[#FB2EA2] hover:text-white"
              variant="outline"
              type="submit"
            >
              수 정
            </Button>
            <Link href={`/user`}>
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
            limit={1}
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
};

export default AccountEditPage;
