'use client';
import { useEffect } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import { createClient } from '@/supabase/client';
import { userInfo } from 'os';

function AuthObserver() {
  const supabase = createClient();
  const { setUserInfo, deleteUserInfo } = useUserInfo();

  const getUserNickname = async (userId: string) => {
    const { data, error } = await supabase.from('user').select('nickname').eq('id', userId).single();

    if (error) {
      return null;
    }

    return data?.nickname;
  };

  useEffect(() => {
    // const session = supabase.auth.getSession();

    // const handleAuthChange = (event: any, session: any) => {
    //   if (session?.user) {
    //     setUserInfo({
    //       id: session.user.id,
    //       nickname: session.user.user_metadata.nickname,
    //       email: session.user.user_metadata.email
    //     });
    //   } else {
    //     deleteUserInfo();
    //   }
    // };

    // handleAuthChange(null, session);

    const handleAuthChange = async (event: any, session: any) => {
      if (session?.user) {
        const nickname = await getUserNickname(session.user.id);
        setUserInfo({
          id: session.user.id,
          nickname: nickname,
          email: session.user.user_metadata.email
        });
      } else {
        deleteUserInfo();
      }
    };

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
