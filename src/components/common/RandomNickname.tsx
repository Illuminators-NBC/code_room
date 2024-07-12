'use client';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

interface RandomNicknameProps {
  onNicknameGenerated: (nickname: string) => void;
}

export default function RandomNickname({ onNicknameGenerated }: RandomNicknameProps) {
  const [nickname, setNickname] = useState('');

  const generateNickname = async () => {
    try {
      const response = await fetch('/api/common');
      const data = await response.json();
      if (response.ok) {
        setNickname(data.nickname);
        onNicknameGenerated(data.nickname);
      } else {
        console.error(data.errorMsg);
      }
    } catch (err) {
      console.error('Failed to fetch nickname', err);
    }
  };

  return (
    <div>
      {/* <Button type="button" onClick={generateNickname} className="w-96 mb-7 bg-[#DD268E] hover:bg-[#FB2EA2]">
        Generate Random Nickname
      </Button> */}
      <button
        className="ml-2 hover:transition-all hover:duration-500 hover:rotate-180 items-center absolute top-[10px] right-[12px]"
        onClick={generateNickname}
      >
        <Image src={'/refresh_icon.png'} alt="refresh icon" width="18" height="18" />
      </button>
    </div>
  );
}
