'use client';
import { useEffect } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import { createClient } from '@/supabase/client';

function AuthObserver() {
  const supabase = createClient();
  const { setUserInfo, deleteUserInfo } = useUserInfo();

  useEffect(() => {
    const session = supabase.auth.getSession();
    const handleAuthChange = (event: any, session: any) => {
      if (session?.user) {
        setUserInfo({
          id: session.user.id,
          nickname: session.user.user_metadata.nickname
        });
      } else {
        deleteUserInfo();
      }
    };

    handleAuthChange(null, session);

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUserInfo, deleteUserInfo]);

  return null;
}

export default AuthObserver;
