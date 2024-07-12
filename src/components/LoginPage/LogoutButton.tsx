'use client';

import { useLoginContext } from '@/context/LoginProvider';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LogoutButton() {
  const { logout } = useLoginContext();
  const router = useRouter();
  const handleLogout = async () => {
    await fetch('api/auth/log-out', { method: 'POST' });
    logout();
    router.replace('/');
    window.location.reload();
  };
  return (
    <button onClick={handleLogout} className="mt-[13px]">
      <Image src={'/logout_icon.png'} alt="mypage" width="20" height="20" />
    </button>
  );
}
