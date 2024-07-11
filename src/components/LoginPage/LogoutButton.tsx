'use client';

import { useLoginContext } from '@/context/LoginProvider';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { logout } = useLoginContext();
  const router = useRouter();
  const handleLogout = async () => {
    await fetch('api/auth/log-out', { method: 'POST' });
    logout();
    router.replace('/');
  };
  return <Button onClick={handleLogout}>Logout</Button>;
}
