'use client';
import Image from 'next/image';
import { useState } from 'react';

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
      <button
        type="button"
        className="ml-2 hover:transition-all hover:duration-500 hover:rotate-180 items-center absolute top-[10px] right-[12px]"
        onClick={generateNickname}
      >
        <Image src={'/refresh_icon.png'} alt="refresh icon" width="18" height="18" />
      </button>
    </div>
  );
}
