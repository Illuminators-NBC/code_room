'use client';

import NicknameSection from '@/components/common/NicknameSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useUserInfo from '@/hooks/useUserInfo';
import { createClient } from '@/supabase/client';
import { FormState } from '@/types/signUpFormType';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountEditPage: React.FC = () => {
  const supabase = createClient();
  const [userEmail, setUserEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const initialState: FormState = {
    email: '',
    pw: '',
    confirmPw: '',
    nickname: '',
    recaptchaToken: ''
  };
  const { userInfo, setUserInfo } = useUserInfo();

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
            handleNicknameChange(data.nickname ?? '');
          }
        }
      } catch (error) {}
    };
    fetchUserData();
  }, []);

  const updateNickname = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('user')
        .update({ nickname: formState.nickname })
        .eq('email', userEmail);
      if (error) {
        throw error;
      }
      setUserInfo({ ...userInfo, nickname: formState.nickname });
    } catch (error) {
      toast.error('닉네임을 수정하는 도중 오류가 발생했습니다.');
    }
  };
  const handleNicknameGenerated = (nickname: string) => {
    setFormState((prev) => ({ ...prev, nickname }));
  };
  const [formState, setFormState] = useState<FormState>(initialState);
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const handleNicknameChange = (nickname: string) => {
    setFormState((prev) => ({ ...prev, nickname }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setNewPassword(e.target.value);

    const { data: user, error } = await supabase.auth.updateUser({ password: newPassword });

    updateNickname(e);
    toast.success('수정되었습니다.');

    router.replace(`/user/${userInfo.id}`);
  };

  return (
    <div className="bg-zinc-950 w-full h-screen">
      <div className="text-white bg-zinc-950 w-[640px] h-screen border border-zinc-800 m-auto p-[30px] text-center ">
        <Image
          src={'/logo_icon.png'}
          alt="code_room logo icon"
          width="50"
          height="50"
          className="m-auto mt-[83px] mb-[60px]"
        />
        <div>
          <Input
            className="w-96 h-10 bg-[#71717A] border-zinc-600 p-4 m-auto mb-7 text-white placeholder:text-white placeholder:font-nomal"
            type="email"
            value={userEmail}
            disabled
          />
          <NicknameSection nickname={formState.nickname} onNicknameChange={handleNicknameChange} />
          <form
            onSubmit={(e) => {
              confirmPassword === newPassword ? handleSubmit(e) : toast.error('비밀번호를 확인해주세요.');
            }}
          >
            <Input
              className="w-96 h-10 bg-[#27272A] border-zinc-600 p-4 m-auto mb-7 text-white"
              type="password"
              placeholder="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              className="w-96 h-10 bg-[#27272A] border-zinc-600 p-4 m-auto mb-7 text-white"
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <Button
              className="w-96 h-10 mt-8 bg-[#DD268E] border-0 font-bold hover:bg-[#FB2EA2] hover:text-white"
              variant="outline"
              type="submit"
            >
              수 정
            </Button>
            <Link href={`/user/${userInfo.id}`}>
              <Button
                className="w-96 h-10 mt-5 bg-[#27272A] border-0 font-bold hover:bg-[#2d2d30] hover:text-white"
                variant="outline"
                onClick={() => {
                  router.replace(`/user/${userInfo.id}`);
                }}
              >
                취 소
              </Button>
            </Link>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AccountEditPage;
